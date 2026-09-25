# Financial Analytics & Reconciliation

## Zero Floating-Point Arithmetic
All Financial Analytics MUST ingest and compute using `Minor Units` (e.g., paise, cents) as integers. Floating point math is strictly prohibited to prevent rounding anomalies in revenue reports.

## Financial Reconciliation Loop
Because the Analytics Data Warehouse is downstream, it can drift. 
A daily automated Reconciliation Script must run:
1. `SUM(Payouts)` from the Partner Ledger (Phase 19).
2. `SUM(Payouts)` from the Analytics `fact_partner_earnings` table.
3. If `Delta != 0`, an Alert is raised for Data Corruption.
