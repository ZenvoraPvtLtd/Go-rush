# Risk Idempotency & Deduplication

## Duplicate Signal Prevention
The Risk Engine ingests thousands of events from the Notification Outbox (e.g., `RideCompleted`, `PaymentFailed`).

To prevent generating duplicate `RiskSignal` records if the broker retries an event, the system enforces a `UNIQUE(eventId, source)` constraint. A duplicate network transmission will not trigger a duplicate fraud evaluation.
