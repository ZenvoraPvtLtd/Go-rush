# Redis Architecture

## 1. Scope of Redis
- Redis is strictly used for **hot ephemeral state** and **publish/subscribe events**.
- Specifically: Driver Live Location (expires after 5 seconds), active WebSockets user mapping, and temporary rate-limiting counters.

## 2. Failure Strategy (Fail-Open vs Fail-Closed)
- **Live Location:** Fail-Open. If Redis dies, drivers simply cannot broadcast location. Ride operations can continue based on manual REST actions.
- **Realtime Gateway:** Fail-Open. If the WS gateway crashes, Flutter clients will fallback to polling `GET /rides/active` via the REST API.
- **Rate Limiting:** Fail-Closed. If Redis dies, OTP generation and login must be blocked or heavily restricted at the network edge to prevent abuse.
