# Analytics Architecture & Domain Principle

## Downstream Only
The Analytics Platform is explicitly a downstream consumer. It MUST NOT mutate the `RideStatus`, `Ledger`, or `PaymentStatus`. 

Operational Databases (PostgreSQL) remain the definitive Source of Truth for transactional states. The Analytics domain provides READ-ONLY reporting.

## Pipeline Architecture
1. **Source:** Operational Services (Ride, Payment, Customer)
2. **Event:** Domain Event emitted via `OutboxEvent` table (Phase 21).
3. **Transport:** (e.g., Kafka / Kinesis / SQS) [BLOCKED: Not Provisioned]
4. **Data Warehouse:** Raw append-only event layer.
5. **Curated Models:** Transformed `fact_` and `dim_` tables.
6. **BI Dashboard:** Renders final KPIs.
