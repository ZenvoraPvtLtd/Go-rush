# Chaos Engineering Failure Matrix

This matrix maps how the GoRush system is architected to behave during localized infrastructure failures.

| Failure Injection | Target Component | Expected Behavior | Actual Behavior | Result | Data Integrity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pod Crash** | NestJS Backend API | Traffic routes to healthy pods. Ongoing requests return 502/503. | N/A | NOT EXECUTED | Safe (No partial DB commits via Prisma) |
| **Redis Outage**| Redis Cache/Geohash| Dispatch APIs return HTTP 503. Caches fail safely. | N/A | NOT EXECUTED | Safe (Redis is transient, DB is canonical) |
| **DB Outage** | PostgreSQL Master | APIs hang until timeout, then return 500. Read replicas take over. | N/A | NOT EXECUTED | Safe (Transactions rollback on timeout) |
| **Worker Crash**| BullMQ Consumer | Job halts. Picked up by another worker upon TTL expiry. | N/A | NOT EXECUTED | Safe (Idempotency prevents double processing) |
| **Network Split**| External Payment API| Stripe request times out. Payment state remains `PENDING`. | N/A | NOT EXECUTED | Safe (Webhook reconciliation will fix later) |

> [!NOTE]
> Physical chaos testing using Gremlin or Chaos Mesh is **BLOCKED** due to lack of a cloud staging environment. These represent the designed architectural fail-safes.
