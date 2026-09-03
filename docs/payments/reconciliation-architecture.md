# Reconciliation Architecture

## Daily Settlement Sync
A cron job will fetch the daily Settlement Report from the Payment Gateway.

## Mismatch Detection
It compares:
`SUM(Gateway.Transactions)` vs `SUM(GoRush.Ledger)`

Any discrepancy is flagged as `MISMATCH` in the `ReconciliationReport` table for manual Finance Team review.

*Dynamic Execution: BLOCKED (Awaiting Provider Auth)*
