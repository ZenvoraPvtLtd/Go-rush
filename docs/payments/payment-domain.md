# Financial Domain Model

## Core Entities

### `PaymentIntent`
- `id`: UUID (Immutable)
- `rideId`: UUID
- `customerId`: UUID
- `amountMinor`: Integer (e.g. 50000 for $500.00)
- `currency`: String (ISO 4217, e.g. "USD")
- `status`: Enum
- `gatewayReference`: String (e.g., `pi_xxxx`)

### `LedgerEntry`
- `id`: UUID (Immutable)
- `intentId`: UUID
- `type`: Enum (DEBIT, CREDIT, REFUND)
- `amountMinor`: Integer
- `currency`: String
- `gatewayTransactionId`: String
- `createdAt`: Timestamp
