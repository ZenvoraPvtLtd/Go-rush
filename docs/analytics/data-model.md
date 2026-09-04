# Curated Analytical Data Model

## Current State
A standalone Data Warehouse is **NOT CONFIGURED**. Therefore, analytical models are derived directly from the operational PostgreSQL schema.

## Operational Facts (Proxy)
- **fact_ride**: Maps directly to the `Ride` table.
- **fact_ride_status_transition**: BLOCKED. Historical transitions are not currently captured in the operational DB.
- **fact_payment**: Maps to `paymentStatus` and `paymentId` on `Ride`. (Incomplete).
- **fact_ledger**: BLOCKED (No Ledger).
- **fact_support_case**: BLOCKED (No Support).

## Operational Dimensions (Proxy)
- **dim_customer**: Maps directly to `User` table.
- **dim_driver**: Maps directly to `Driver` table.

## Missing Dimensions
- **dim_location**: BLOCKED (No distinct location tracking history table).
- **dim_promotion**: BLOCKED (No promotion configuration).
