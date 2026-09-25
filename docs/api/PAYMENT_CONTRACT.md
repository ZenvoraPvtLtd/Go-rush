# Payment Contract

- **Order Creation**: `/v1/payments/intent`
- **Webhook**: `/v1/webhooks/payment`

**Rules**:
- Webhooks require strict signature verification.
- Idempotency keys must be used.
- Client callbacks are NEVER treated as financial proof.