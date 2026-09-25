import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Scaffold implementation for compilation
    request.user = { id: 'test-user', role: 'CUSTOMER' };
    return true;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard {}
