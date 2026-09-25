# Realtime Architecture

## Overview
The Phase 8 Realtime Architecture establishes a scalable, strictly authorized WebSocket boundary for driver location ingestion and customer live tracking.

## Components
1. **LocationIngestionService:** The intake boundary. It runs incoming GPS pings through the `LocationSanityPolicy` (which rejects coordinates outside normal bounds or with >50m accuracy). It also validates the `sequenceNumber` to drop duplicate or out-of-order packets common on unreliable mobile networks.
2. **RedisLocationStore (Hot State):** Location data isn't permanently written to PostgreSQL on every ping. Instead, it is cached in Redis with a short TTL, acting as a "Hot State". When the TTL expires, the location is inherently stale.
3. **RealtimeGateway:** Authenticates connections via JWT. It ensures that a customer can only subscribe to the `ride:{rideId}` channel if they definitively own that active ride.
4. **REST Fallback:** If the WebSocket fails or the Flutter app is backgrounded, the customer can poll `GET /v1/rides/:rideId/realtime-state` to fetch the authoritative ride status and the latest Redis hot state location.

## Customer Flutter Architecture
- **RealtimeService:** Abstracts the WebSocket connection.
- **RideStatusScreen:** Subscribes to the `RealtimeService` stream when the ride hits `DRIVER_ASSIGNED`. The screen gracefully handles updates to the UI, simulating an ETA decrement.
