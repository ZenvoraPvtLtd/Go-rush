import { AuthGuard } from './auth.guard.js';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AuthGuard Runtime Certification', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    authGuard = new AuthGuard(jwtService);
  });

  const createMockContext = (headers: any = {}): ExecutionContext => {
    const req = { headers, user: null };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as any;
  };

  it('1. Rejects missing JWT', () => {
    const ctx = createMockContext();
    expect(() => authGuard.canActivate(ctx)).toThrow(UnauthorizedException);
    expect(() => authGuard.canActivate(ctx)).toThrow('Missing token');
  });

  it('2. Rejects malformed JWT', () => {
    const ctx = createMockContext({ authorization: 'Bearer no-dots-here' });
    expect(() => authGuard.canActivate(ctx)).toThrow(UnauthorizedException);
  });

  it('3. Rejects invalid signature', () => {
    // Generate valid token, but change signature
    const validToken = jwtService.sign({ sub: 'user123' });
    const tamperedToken = validToken.substring(0, validToken.lastIndexOf('.') + 1) + 'invalid_sig';
    const ctx = createMockContext({ authorization: `Bearer ${tamperedToken}` });
    expect(() => authGuard.canActivate(ctx)).toThrow('Invalid or expired token');
  });

  it('4. Rejects expired JWT', () => {
    const expiredToken = jwtService.sign({ sub: 'user123' }, { expiresIn: '-1s' });
    const ctx = createMockContext({ authorization: `Bearer ${expiredToken}` });
    expect(() => authGuard.canActivate(ctx)).toThrow('Invalid or expired token');
  });

  it('5. Accepts valid JWT and extracts identity', () => {
    const validToken = jwtService.sign({ sub: 'user-777', role: 'DRIVER' });
    const ctx = createMockContext({ authorization: `Bearer ${validToken}` });
    
    const result = authGuard.canActivate(ctx);
    expect(result).toBe(true);
    
    const req = ctx.switchToHttp().getRequest();
    expect(req.user).toEqual({ id: 'user-777', role: 'DRIVER' });
  });

  it('6. Arbitrary userId supplied by client cannot override authenticated identity', () => {
    // The request object might already have a body or query with a different userId,
    // but the guard should strictly set request.user based on the token.
    const validToken = jwtService.sign({ sub: 'real-user-id' });
    const req = {
      headers: { authorization: `Bearer ${validToken}` },
      body: { userId: 'fake-admin-id' }
    };
    
    const ctx = {
      switchToHttp: () => ({ getRequest: () => req }),
    } as any;

    authGuard.canActivate(ctx);
    expect((req as any).user.id).toBe('real-user-id');
    expect((req as any).user.id).not.toBe('fake-admin-id');
  });
});
