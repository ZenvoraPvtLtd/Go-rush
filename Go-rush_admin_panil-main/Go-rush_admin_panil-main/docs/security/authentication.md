# Authentication & Authorization Security

## Authentication Posture
- **Mechanism**: JWT Bearer Tokens.
- **Password Storage**: `bcrypt` (10 rounds standard salt).
- **OTP**: 6-digit random code, 10-minute expiry.

## Authorization (IDOR Protection)
Authorization is strictly evaluated on the server.
**Testing Strategy**:
All `GET /rides/:id`, `GET /users/:id` endpoints must explicitly check:
```typescript
if (req.user.sub !== resource.ownerId && req.user.role !== 'ADMIN') {
  throw new ForbiddenException();
}
```

> [!WARNING]
> While JWT is configured, global object-level authorization (IDOR checks) are not fully abstracted into a generic guard yet and rely on individual service implementation. This is a **KNOWN GAP** requiring further enforcement.
