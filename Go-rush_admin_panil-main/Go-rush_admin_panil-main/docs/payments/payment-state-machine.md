# Payment State Machine

## Allowed Transitions
- `CREATED` → `REQUIRES_PAYMENT`
- `REQUIRES_PAYMENT` → `PROCESSING`
- `PROCESSING` → `SUCCEEDED` (Terminal state, triggers Ledger update)
- `PROCESSING` → `FAILED`
- `SUCCEEDED` → `REFUND_PENDING`
- `REFUND_PENDING` → `REFUNDED`

*Note: The Payment Status is strictly separated from the Ride Status (e.g. `RIDE_COMPLETED`).*
