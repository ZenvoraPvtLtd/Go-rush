# Phase 11 Audit: Partner Ride Operations & Dispatch Integration

## 1. Existing State Machines
- **RideStateMachine (Phase 6):** Maintains the canonical flow: `REQUESTED -> SEARCHING -> DRIVER_ASSIGNED -> DRIVER_EN_ROUTE -> DRIVER_ARRIVED -> RIDE_STARTED -> RIDE_IN_PROGRESS -> RIDE_COMPLETED`. Terminal states also include `CANCELLED`, `NO_DRIVER`, and `FAILED`.
- **DriverOfferStateMachine (Phase 7):** Maintains the offer flow: `PENDING -> ACCEPTED | REJECTED | EXPIRED | CANCELLED`.

## 2. Shared & Reusable Components
- `RideStatus` and `DriverOfferStatus` enums are canonical and will NOT be duplicated. 
- The Partner app will consume these exact states.
- The Core Backend handles location ingestion and realtime events (from Phase 8).

## 3. Missing Operations & Integration Requirements
- **Offer Mutation:** The `partner/backend` needs authenticated REST endpoints to execute `ACCEPT` and `REJECT` commands, passing them securely to the Core Backend's DispatchEngine. This ensures double-booking race conditions are mitigated atomically.
- **Ride Command Mutation:** The `partner/backend` needs endpoints for drivers to trigger transitions: `Mark Arriving (DRIVER_EN_ROUTE)`, `Mark Arrived (DRIVER_ARRIVED)`, `Start Ride (RIDE_STARTED/IN_PROGRESS)`, and `Complete Ride (RIDE_COMPLETED)`.
- **Flutter UI Integration:** `partner/frontend` needs an Active Ride screen that reacts to Realtime events (or REST reconciliation) and displays valid state transition buttons depending on the canonical state.

## 4. Architecture Constraints
- **Idempotency:** Crucial for REST operations in poor mobile networks.
- **Environment Limitations:** `ENOSPC` remains in effect. We will scaffold structural TypeScript and Dart code for integration endpoints and UI without pulling new packages.
