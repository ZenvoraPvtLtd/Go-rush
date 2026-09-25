# Payment Security & Webhooks

## Webhook Signature Verification
All incoming webhooks MUST be cryptographically verified using the Provider's signed secret.
*Status: BLOCKED (Awaiting Provider Auth)*

## Webhook Replay Protection
The `eventId` from the Gateway is stored in a `ProcessedWebhooks` table with a UNIQUE constraint.
Duplicate events are acknowledged with `200 OK` but dropped idempotently to prevent duplicate Ledger Entries.
