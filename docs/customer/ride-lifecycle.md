# Ride Lifecycle

## State Flow
The standard happy-path lifecycle of a ride is:
1. `REQUESTED`
2. `SEARCHING`
3. `DRIVER_ASSIGNED`
4. `DRIVER_EN_ROUTE`
5. `DRIVER_ARRIVED`
6. `RIDE_STARTED`
7. `RIDE_IN_PROGRESS`
8. `RIDE_COMPLETED`

## Terminal States
Once a ride enters a terminal state, it can no longer transition to any other state:
- `RIDE_COMPLETED`
- `CANCELLED`
- `NO_DRIVER`
- `FAILED`

## Driver & Dispatch Boundary
In Phase 6, we stop at `SEARCHING`. The actual matching logic will be handled by a dedicated Dispatch service in future phases.
