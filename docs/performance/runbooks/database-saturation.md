# SRE Runbook: Database Saturation

## 1. Detection
- **Alert**: `PostgreSQL_CPU_>_80%` or `PgBouncer_Pool_Exhausted`.
- **Symptoms**: High API latency on all dispatch and ride creation endpoints. HTTP 504 Gateway Timeouts.

## 2. Immediate Action
- Acknowledge PagerDuty alert.
- Check Datadog APM to identify if a specific unindexed query (e.g., from Admin Analytics) is causing table scans.

## 3. Diagnosis
- Run `SELECT * FROM pg_stat_activity WHERE state = 'active';` to find hanging queries.
- Check if the outbox event publisher is stuck in a loop.

## 4. Mitigation
- If caused by an analytics query, kill the query via `pg_cancel_backend(pid)`.
- If caused by legitimate traffic spike, attempt to scale up the RDS/CloudSQL instance size (requires brief downtime).
- Temporarily rate-limit the customer creation API to shed load.

## 5. Verification
- Monitor Datadog CPU metrics to ensure they drop below 60%.
- Ensure API p95 latency returns to <200ms.
