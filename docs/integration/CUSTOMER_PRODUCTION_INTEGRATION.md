# Customer Production Integration

## Overview
This document outlines the Phase 3 implementation details for migrating the Customer Flutter App to operate entirely through the GoRush Canonical Backend, removing all mock dependencies.

## Feature Mapping Status

| Feature | Endpoint / Socket Event | Status |
|---------|-------------------------|--------|
| Authentication | `POST /api/v1/auth/login` | BLOCKED (Disk space) |
| OTP | `POST /api/v1/auth/otp` | BLOCKED |
| User Profile | `GET /api/v1/users/me` | BLOCKED |
| Maps & Places | `GET /api/v1/places/search` | BLOCKED |
| Pickup/Drop | `GET /api/v1/maps/route` | BLOCKED |
| Fare Quote | `POST /api/v1/pricing/quote` | BLOCKED |
| Ride Creation | `POST /api/v1/rides` | BLOCKED |
| Driver Details | `GET /api/v1/rides/:id/driver` | BLOCKED |
| Driver Location | WS: `driver.location.updated` | BLOCKED |
| ETA & Arrival | WS: `ride.status.changed` (ARRIVED) | BLOCKED |
| Ride Start/End | WS: `ride.status.changed` (STARTED/COMPLETED) | BLOCKED |
| Payment & Wallet | `GET /api/v1/wallets/balance` | BLOCKED |
| Rating | `POST /api/v1/rides/:id/rating` | BLOCKED |
| History | `GET /api/v1/rides/history` | BLOCKED |
| Safety & SOS | `POST /api/v1/safety/sos` | BLOCKED |
| Support | `POST /api/v1/support/tickets` | BLOCKED |

## WebSocket Realtime Strategy
The Customer app must maintain a persistent connection to the Backend WebSocket server.

### Consumed Events:
- `ride.requested`
- `ride.offer.created`
- `ride.assigned`
- `ride.status.changed`
- `driver.location.updated`
- `ride.rematch.started`
- `ride.rematch.completed`
- `payment.updated`
- `sos.created`
- `support.ticket.updated`

### Disconnect & Reconnect Handling
If the WebSocket disconnects, the Customer Flutter App will:
1. Re-initiate connection via exponential backoff.
2. Authenticate the socket connection using the JWT token.
3. Call `GET /api/v1/rides/current` to resync the current active ride state.
4. Replace local state with the backend-authoritative state.

## Security Constraints
The Flutter app acts strictly as a dumb client. It will **never** directly set:
- Ride Status
- Fare Prices
- Driver Assignments
- Wallet Balances
- Payment Success Flags

All state mutations must occur on the Canonical Backend, which validates authorization and idempotency.

## Test Results
- **Flutter Tests**: BLOCKED (Environment Disk Space)
- **Backend Integration Tests**: BLOCKED (Environment Disk Space)
