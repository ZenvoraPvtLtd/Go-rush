# Full Ride Reconciliation

This document tracks the lifecycle consistency of a single standard ride from request to final ledger settlement.

## Operational Lifecycle
1. **Creation**: `Ride` entity is created (`status = PENDING`).
2. **Dispatch**: Analytics `Event` is pushed to outbox (`RIDE_REQUESTED`).
3. **Execution**: Driver state matches Ride state (`IN_PROGRESS`).
4. **Completion**: Ride marked `COMPLETED`. 

## Financial Lifecycle (Reconciliation Check)
1. **Quote**: Customer was quoted $15.00 (stored as `1500` minor units).
2. **Payment Intent**: Authorized `1500` against Customer Wallet/Card.
3. **Capture**: Stripe captures `1500`.
4. **Ledger (Double-Entry)**:
   - **Credit**: GoRush Holding Account (+1500)
   - **Debit**: Customer Account (-1500)
5. **Partner Settlement**:
   - 80% commission logic evaluated.
   - **Credit**: Driver Wallet (+1200)
   - **Credit**: GoRush Revenue (+300)
   - **Debit**: GoRush Holding Account (-1500)

**Validation Status**: Code architecture supports integer minor-unit financial ledger. Full external end-to-end processing is **BLOCKED** due to lack of Stripe Sandbox credentials.
