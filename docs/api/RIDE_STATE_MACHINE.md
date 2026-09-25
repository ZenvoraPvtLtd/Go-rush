# Canonical Ride State Machine

## States
- REQUESTED
- SEARCHING
- OFFERED
- ASSIGNED
- DRIVER_EN_ROUTE
- DRIVER_ARRIVED
- STARTED
- IN_PROGRESS
- COMPLETED
- CANCELLED
- NO_DRIVER
- DISPUTED

## Transition Matrix
- REQUESTED -> SEARCHING
- SEARCHING -> OFFERED, NO_DRIVER, CANCELLED
- OFFERED -> ASSIGNED, SEARCHING, CANCELLED, NO_DRIVER
- ASSIGNED -> DRIVER_EN_ROUTE, CANCELLED, DISPUTED
- DRIVER_EN_ROUTE -> DRIVER_ARRIVED, CANCELLED, DISPUTED
- DRIVER_ARRIVED -> STARTED, CANCELLED, DISPUTED
- STARTED -> IN_PROGRESS
- IN_PROGRESS -> COMPLETED, DISPUTED

## Actor Permissions
- **CUSTOMER**: Can request ride, cancel own ride (pre-dispatch).
- **DRIVER**: Can accept/reject offers, signal en-route, arrived, start (OTP), complete.
- **ADMIN**: Authorized operational interventions.
- **SYSTEM**: Dispatch timeouts, rematch.

## Backend Authority
Clients cannot set ride status directly. All mutations go through the `RideTransitionService`, which enforces atomic database updates, timestamps, idempotency, and WebSocket `ride.status.changed` event emissions.