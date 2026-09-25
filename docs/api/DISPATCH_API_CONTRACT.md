# Dispatch API Contract

- `POST /v1/dispatch/online` (Driver)
- `POST /v1/dispatch/location` (Driver)
- `POST /v1/dispatch/offers/:id/accept`
- `POST /v1/dispatch/offers/:id/reject`

**Rule**: Atomic assignment is enforced by the backend using Redis locks.