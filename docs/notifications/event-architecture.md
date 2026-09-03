# Event Architecture & Envelope

## Ownership Boundary
The Notification Platform does NOT own `RideStatus` or `PaymentStatus`. It strictly consumes `Domain Events` emitted by the authoritative services.

## Canonical Event Envelope
```json
{
  "eventId": "uuid-v4",
  "eventType": "RideCompleted.v1",
  "aggregateId": "ride-uuid-123",
  "aggregateType": "Ride",
  "occurredAt": "2026-09-03T12:00:00Z",
  "payload": {
    "fare": 2500,
    "currency": "GBP"
  }
}
```
