# Driver/Captain Production Integration

## Overview
This document specifies the integration of the Driver Flutter App (`driver_flutter`) with the GoRush Core Backend, explicitly replacing any reliance on the legacy MongoDB/Python backend. The canonical backend handles all authoritative state and real-time dispatching.

## Driver State Machine
- **OFFLINE**: Driver is disconnected or not accepting rides.
- **ONLINE**: Driver is available for dispatch.
- **OFFERED**: Dispatch engine has offered a ride to the driver.
- **BUSY**: Driver is handling a ride (En-route, Arrived, or In-Progress).
- **COMPLETED**: Driver finished a trip (transitional state before ONLINE).

## Feature Map

| Feature | Endpoint / Socket Event | Protocol |
|---------|-------------------------|----------|
| Auth & OTP | `POST /api/v1/auth/login/driver` | HTTP |
| KYC & Docs | `POST /api/v1/drivers/kyc` | HTTP |
| Online/Offline | `PUT /api/v1/drivers/status` | HTTP |
| Location Sync | WS: `driver.location.update` | WS |
| Dispatch Offer | WS: `dispatch.offer` | WS |
| Accept/Reject | `POST /api/v1/dispatch/accept` | HTTP |
| Ride Start | `POST /api/v1/rides/:id/start` | HTTP |
| Active Ride | WS: `ride.status.changed` | WS |
| Completion | `POST /api/v1/rides/:id/complete` | HTTP |
| Earnings/Payouts | `GET /api/v1/earnings` | HTTP |

## Dispatch Race Condition Mitigations
The Canonical backend uses Redis Distributed Locks & Database Transactions to strictly enforce the following:
1. **Double Accept Prevention**: Redis lock on `ride:{id}:accept` prevents two drivers from claiming the same ride.
2. **Expired Offers**: The backend drops offers internally after `timeout_seconds`. If a driver sends a late `accept` request, the API will reject it with `410 GONE`.
3. **Customer Cancellation**: If the customer cancels, a redis lock on the ride state blocks driver acceptance and emits a `ride.cancelled` WS event to the driver.
4. **Idempotency**: All state transitions (`accept`, `start`, `complete`) require an `Idempotency-Key` header.

## WebSocket Realtime Strategy
- **Heartbeat & Resync**: On WS disconnect, the Driver app will exponentially back off. Upon reconnection, it calls `GET /api/v1/drivers/me/state` to retrieve the active state (e.g., if a ride was accepted during disconnect) to prevent stale local UI.
- **Location Updates**: Sent every 5 seconds while ONLINE. Stale location updates (>15s old timestamp) are discarded by the backend.

## Security Constraints
The driver app relies completely on backend validation. The app **cannot**:
- Modify the ride fare or surge parameters.
- Force-accept a ride that was not explicitly offered via WS.
- Update wallet balance manually.
- Alter the canonical Ride flow.
