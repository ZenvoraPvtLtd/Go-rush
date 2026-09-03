# Refund & Ledger Architecture

## Refund Policy
- **Limits:** The `amountMinor` of a refund attempt cannot exceed the original `LedgerEntry` amount.
- **State:** `SUCCEEDED` payments transition to `REFUND_PENDING` during gateway processing.

## Ledger Immutability
`LedgerEntry` rows are strictly APPEND-ONLY. 
A successful Refund does NOT delete or modify the original `DEBIT` row. It creates a new compensating `CREDIT` row linked to the same `intentId`.
