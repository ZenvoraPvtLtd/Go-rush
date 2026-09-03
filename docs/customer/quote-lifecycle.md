# Quote Lifecycle

## Immutability
A Quote represents a snapshot of pricing at a specific moment in time. Once a `Quote` is generated, its ID, Fare Breakdown, and Pricing Version are immutable. 

## Generation Flow
1. Client sends `distanceMeters`, `durationSeconds`, and an `Idempotency-Key` to the `/v1/quotes` endpoint.
2. The server generates a unique `Quote` for each available `RideCategory`.
3. The server stores these quotes in a secure temporary datastore (mapped to the authenticated `customerId`).

## Expiration & Refresh
Quotes have a configurable TTL (e.g., 5 minutes). 
- **Flutter UI**: Tracks the `expiresAt` timestamp. Once expired, the Confirm button is disabled, and the user must request a fresh quote.
- **Backend Validation**: Any attempt to confirm a ride against an expired Quote ID will be rejected at the API layer.
