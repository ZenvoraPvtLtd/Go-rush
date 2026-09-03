# Event Architecture & Idempotency

## The Event Envelope
To maintain Analytics data quality, every emitted Domain Event must adhere to a strict envelope:
```json
{
  "eventId": "uuid-v4",
  "eventType": "RideCompleted",
  "eventVersion": "1.0",
  "occurredAt": "2026-09-03T12:00:00Z",
  "producer": "RideService",
  "payload": {
     "rideId": "abc-123",
     "finalFareMinor": 15000
  }
}
```

## Idempotency
Because network transport can retry messages, the Data Warehouse ingestion layer MUST enforce `UNIQUE(eventId)`.
If a `RideCompleted` event is delivered twice, the second instance must be silently dropped to prevent double-counting GMV and Ride Totals in the BI Dashboards.
