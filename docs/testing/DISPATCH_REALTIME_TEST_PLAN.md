# Dispatch and Realtime Engine Test Plan

## Overview
This document outlines the testing strategy for the Production Dispatch and Realtime Engine connecting the Customer App, Driver App, Canonical Backend, and Admin Panel.

## Test Scenarios & Expected Outcomes

### Scenario 1: Standard End-to-End Lifecycle
1. **Customer requests ride**: `ride.requested` emitted. Backend persists ride.
2. **Backend Engine**: Discovers Driver A and B using PostGIS query filtering.
3. **Driver A offered**: `dispatch.offer` sent to Driver A via WS. Redis timer started.
4. **Driver A rejects**: `POST /api/v1/dispatch/reject`. Redis clears lock, adds to exclusion set.
5. **Driver B offered**: `dispatch.offer` sent to Driver B.
6. **Driver B accepts**: `POST /api/v1/dispatch/accept`. Backend verifies Redis lock, assigns ride, updates PostGIS state to `ASSIGNED`.
7. **Assignment Broadcast**: `ride.assigned` emitted to Customer and Admin WS namespaces.
8. **Live Tracking**: Driver B emits high-frequency GPS to `wss`. Backend echoes `driver.location.sync` to Customer and Admin.
9. **Arrival**: Driver B calls `/api/v1/rides/:id/arrive`. `ride.status.changed` (DRIVER_ARRIVED) emitted.
10. **Start (OTP)**: Driver B submits OTP via `/api/v1/rides/:id/start`. State becomes `STARTED`.
11. **Completion**: Driver calls `/api/v1/rides/:id/complete`. Backend processes payment transaction, emits `ride.status.changed` (COMPLETED) and `payment.updated`.
12. **Admin Verification**: Admin live operations dashboard reflects final state via WS updates without refresh.

### Scenario 2: Race Condition (Simultaneous Accept)
- Driver A and Driver B receive offer near simultaneously.
- Driver A clicks accept. Request enters NestJS, acquires Redis lock `lock:ride:{id}:accept`.
- Driver B clicks accept 100ms later. Request enters NestJS, fails to acquire Redis lock.
- **Expected Outcome**: Driver A gets HTTP 200 (Assigned). Driver B gets HTTP 409 Conflict / 410 Gone. Customer assigned to Driver A.

### Scenario 3: Customer Cancellation During Dispatch
- Ride offered to Driver A.
- Customer clicks Cancel. Backend updates DB to `CANCELLED`, sets Redis flag.
- Driver A clicks Accept.
- **Expected Outcome**: Driver A receives HTTP 410 Gone (Ride Cancelled). Customer receives refund/success status.

### Scenario 4: Reconnect & Stale Data
- Customer loses internet while ride is `ASSIGNED`.
- Driver transitions ride to `STARTED` while customer is offline.
- Customer reconnects, WS re-authenticates.
- Customer calls `GET /api/v1/rides/current`.
- **Expected Outcome**: Customer UI skips `DRIVER_ARRIVED` and jumps directly to `STARTED` state based on authoritative backend API payload.

## Execution Requirements
1. **Infrastructure**: Requires Redis, PostgreSQL/PostGIS.
2. **Mocking**: No mock databases. Tests must seed actual PostGIS locations.
3. **WebSocket**: E2E Socket.io test suite using `socket.io-client` against canonical backend.
