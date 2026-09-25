# Ride State Machine

## Canonical States
The GoRush Core Backend is the authoritative source for the ride state. The frontend clients must sync with these states via WebSocket or polling.

1. **REQUESTED**: Customer has initiated a ride request.
2. **SEARCHING**: Dispatch engine is looking for nearby drivers.
3. **OFFERED**: Ride is currently offered to a specific driver (awaiting accept/reject).
4. **ASSIGNED**: A driver has accepted the ride.
5. **DRIVER_EN_ROUTE**: Driver is navigating to the pickup location.
6. **DRIVER_ARRIVED**: Driver has reached the pickup location and is waiting for the customer.
7. **STARTED**: Customer is in the vehicle and the trip has begun.
8. **IN_PROGRESS**: The ride is ongoing towards the destination.
9. **COMPLETED**: The ride has reached the destination and payment is processed.

## Alternative / Terminal States
- **CANCELLED**: The ride was cancelled by the customer or driver before completion.
- **NO_DRIVER**: Dispatch engine failed to find a driver within the timeout period.
- **DISPUTED**: The ride ended with a dispute (e.g., payment failure, safety issue).

## State Transitions
Transitions are strictly enforced by the backend. Invalid state transitions (e.g., from `REQUESTED` directly to `COMPLETED`) will be rejected by the API.
