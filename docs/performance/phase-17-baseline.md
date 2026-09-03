# Performance Baseline

**Note:** All dynamic metrics are currently listed as `NOT MEASURED` as the target Staging Infrastructure has not been provisioned by the Cloud Provider.

| Endpoint | Test | Environment | Concurrency | Latency p95 | Errors | Throughput |
|---|---|---|---|---|---|---|
| `POST /auth/login` | Load | Staging | 100 | NOT MEASURED | NOT MEASURED | NOT MEASURED |
| `POST /ride/create` | Load | Staging | 50 | NOT MEASURED | NOT MEASURED | NOT MEASURED |
| `WS /location` | Fan-out | Staging | 500 | NOT MEASURED | NOT MEASURED | NOT MEASURED |
| `GET /driver/offers` | Load | Staging | 200 | NOT MEASURED | NOT MEASURED | NOT MEASURED |
