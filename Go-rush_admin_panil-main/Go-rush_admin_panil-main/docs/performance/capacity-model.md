# GoRush Capacity Model

This document outlines the target capacity and scaling dimensions for the platform. 

> [!WARNING]
> These are **ESTIMATED TARGETS** based on the architectural design. They are **NOT MEASURED** values, as cloud infrastructure is currently unavailable.

## 1. Expected Traffic Model
- **Normal Load**: 50 Rides/second (RPS: 1,500 total API requests).
- **Peak Load**: 200 Rides/second (RPS: 6,000 total API requests).
- **Driver Concurrency**: 100,000 active concurrent WebSocket connections.

## 2. Component Limits
| Component | Metric | Target Limit (Estimated) | Bottleneck Vector |
| :--- | :--- | :--- | :--- |
| **NestJS API** | Max RPS per pod | 500 RPS | Node.js Event Loop CPU |
| **PostgreSQL** | Max Connections | 2000 (via PgBouncer) | Lock Contention / Row Locks |
| **Redis** | Max Pub/Sub Msg | 50,000 ops/sec | CPU (Single Threaded) |
| **WebSockets** | Max Conn per pod| 10,000 connections | Memory (approx 5MB per 1k) |

## 3. Database Connection Budget
**Formula**: `(Application Pods * Pool Size) + Background Workers <= Max DB Connections`
- If we scale to 50 API Pods with a pool size of 20, we require 1,000 connections.
- **Requirement**: A connection pooler (e.g., PgBouncer) MUST be deployed in staging to prevent PostgreSQL connection exhaustion.

## 4. Known Breakpoints (Theoretical)
- **Redis Geohash Bottleneck**: Dispatching a ride requires an `O(N)` query on Redis where N is nearby drivers. Above 5,000 drivers in a 1km radius, CPU will spike.
- **Outbox Poller Bottleneck**: If the PostgreSQL outbox table grows beyond 100k unacknowledged rows, sequential scanning will degrade DB performance. Indexing is required.
