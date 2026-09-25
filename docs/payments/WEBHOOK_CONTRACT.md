# Webhook Contract

## Overview
This defines the canonical structure and processing rules for payment provider webhooks.

## Endpoint
`POST /api/v1/payments/webhook`

## Security Requirements
- **Signature Verification**: Every incoming webhook must contain the `X-Provider-Signature` header. The payload must be hashed with the provider secret and matched against this header. Requests failing this check return `401 Unauthorized`.
- **Duplicate Protection**: The backend looks up the `provider_transaction_id` in the database. If it exists and is marked processed, the backend safely returns `200 OK` without triggering ledger mutations.

## Payload Structure (Standardized Internal)
```json
{
  "provider_transaction_id": "txn_12345",
  "provider_order_id": "order_abcde",
  "status": "SUCCESS|FAILED|REFUNDED",
  "amount": 150.00,
  "currency": "USD",
  "metadata": {
    "ride_id": "uuid-ride",
    "user_id": "uuid-user"
  }
}
```

## Failure Handling
If the webhook signals a `FAILED` payment, the backend updates the ride status to `PAYMENT_FAILED` and pushes a `payment.updated` event to the driver and customer WS namespaces so they can attempt an alternate payment method.
