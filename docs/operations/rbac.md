# RBAC & Authorization

## Implementation
Relies on the canonical Phase 2/10 `Admin` module and `JwtAuthGuard`. 
Granular object-level permissions (e.g., specific Partner fleet access) are **NOT CONFIGURED** yet and must be expanded when the Partner domain is built.

## Endpoints
Operations endpoints are restricted via `@UseGuards(JwtAuthGuard)`.
