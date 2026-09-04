# Data Quality Framework

## Quality Checks
Checks must run against the event pipeline and the data warehouse (currently just operational DB).

- **Completeness**: Are there rides without valid User or Driver IDs?
- **Freshness**: Are the latest rides within 5 minutes of system time?
- **Uniqueness**: Are Event IDs unique? (Currently BLOCKED - no event IDs).

## Severity Levels
- **INFO**: Non-blocking anomalies.
- **WARNING**: Data stale or missing non-critical dimensions.
- **ERROR**: Dropped events, schema validation failures.
- **CRITICAL**: Financial reconciliation failure.