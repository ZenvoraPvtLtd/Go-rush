# Earning & Partner Ledger Architecture

## Separation of Concerns
- **Customer Payment:** Owned by the Payments domain (Phase 18).
- **Partner Earning:** A logically separate entity derived from the completed Ride. A customer payment `SUCCESS` does not automatically transfer money to a Partner's mutable balance.

## Ledger Immutability
`PartnerFinancialLedger` is an APPEND-ONLY log.
- `Earning` entries are added as `CREDIT`.
- `Payout` events are added as `DEBIT`.
- `Refund Adjustments` append a compensating `DEBIT`. Historical `Earning` rows are NEVER overwritten.
