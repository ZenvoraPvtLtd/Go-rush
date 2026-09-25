# Idempotency Architecture

## Operations
The following endpoints enforce Idempotency via an `Idempotency-Key` header:
- `POST /payment/intent/create`
- `POST /payment/intent/capture`
- `POST /payment/refund`

Duplicate requests with the same key within a 24-hour TTL will return the exact payload of the original successful request without mutating financial state.
