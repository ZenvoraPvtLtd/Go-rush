# Authorization Matrix

## Roles
- **CUSTOMER**: Standard rider.
- **DRIVER**: Verified partner.
- **ADMIN**: System administrator.
- **SYSTEM**: Internal microservices or queue workers.

## Matrix

| Endpoint | CUSTOMER | DRIVER | ADMIN |
|----------|----------|--------|-------|
| `/auth/login` | Allow | Allow | Allow |
| `/users/me` | Self | Self | Allow |
| `/drivers/status` | Deny | Self | Allow |
| `/rides` (POST) | Allow | Deny | Allow |
| `/rides/:id` (GET) | Owner | Assigned | Allow |
| `/dispatch/accept` | Deny | Offered | Deny |
| `/admin/*` | Deny | Deny | Allow |

## Implementation Details
- **JWT**: Authorization is enforced via JWT claims extracting the user's role.
- **Guards**: NestJS `@Roles()` decorators and `RolesGuard` will enforce this matrix at the controller level.
- **Idempotency**: Critical POST endpoints (like `/rides`, `/payments/charge`) will require an `Idempotency-Key` header to prevent duplicate operations.
