# Ride State Machine

## Purpose
The `RideStateMachine` prevents illegal state mutations. 

## Implementation
It is implemented as a static domain mapping of allowed transitions.
```typescript
const transitions = {
  [RideStatus.SEARCHING]: [RideStatus.DRIVER_ASSIGNED, RideStatus.CANCELLED, RideStatus.NO_DRIVER],
  [RideStatus.DRIVER_ASSIGNED]: [RideStatus.DRIVER_EN_ROUTE, RideStatus.CANCELLED],
}
```

## Security Benefit
By centralizing transition validation, no single HTTP endpoint or Admin tool can accidentally bypass business rules to force a ride into an impossible state.
