# Event Processing and Idempotency

## Idempotency
Analytics ingestion must be idempotent.
Consumers must be designed for:
- duplicate events
- retries
- out-of-order events
- late events
- replayed events
- partial failures

## Deduplication Strategy
Deduplication is based on an immutable `eventId` (UUID). Timestamp alone will NEVER be used as a deduplication key.

## Event Envelope
```json
{
  "eventId": "uuid",
  "eventType": "ride.completed",
  "eventVersion": "1.0",
  "occurredAt": "2026-09-04T12:00:00Z",
  "publishedAt": "2026-09-04T12:00:01Z",
  "producer": "RidesModule",
  "aggregateType": "Ride",
  "aggregateId": "uuid",
  "payload": {},
  "metadata": {}
}
```

## Retry and Replay
- **Dead-letter handling**: Events failing validation 3 times are sent to DLQ (NOT CONFIGURED).
- **Replay**: Can be safely initiated by supplying a date range or specific event IDs. Idempotent consumers guarantee no duplicate state mutation.
