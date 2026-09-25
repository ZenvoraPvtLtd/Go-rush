# Payout & Settlement State Machine

## Payout Lifecycle
- `CREATED`
- `PROCESSING`
- `SUCCEEDED` (Terminal state, requires explicit Webhook confirmation)
- `FAILED`

## Idempotency & Double-Spend Protection
`SettlementBatch` uses a database Transaction boundary to lock specific `Earning` rows. An `Earning` cannot be part of two settlements simultaneously. Webhooks mapping to `PROCESSING` payouts use idempotent `eventId` constraints to prevent double-crediting.
