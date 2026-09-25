# Idempotency Certification

The GoRush platform implements idempotency across critical operational pathways to prevent duplicate processing during network retries.

| Operation | Idempotency Key | Storage | Duplicate Behavior | Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Ride Request** | `X-Idempotency-Key` / Client Ride ID | Redis | Return existing `Ride` object without dispatching new offer. | PASS |
| **Payment Webhook** | `stripe_event_id` | PostgreSQL | Ignore duplicate webhook event (200 OK early return). | PASS |
| **Support Ticket** | Client UUID | PostgreSQL | Return existing ticket reference. | PASS |
| **Rating Submission**| `ride_id` + `rater_id` | PostgreSQL | Reject via DB Unique Constraint `(rideId, reviewerId)`. | PASS |
| **Fleet Assignment** | `vehicle_id` + `driver_id` | PostgreSQL | Reject if driver is already actively assigned to another vehicle. | PASS |
