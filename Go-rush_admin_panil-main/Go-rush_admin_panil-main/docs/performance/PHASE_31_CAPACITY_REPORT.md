# PHASE 31 CAPACITY REPORT

## 1. Tested Capacity
**NOT MEASURED.** No cloud infrastructure was provided to execute hyperscale load testing.

## 2. Architectural Limits & Scaling Recommendations
Based on the system's design, the following limits must be respected upon cloud deployment:
- **API Pods (NestJS)**: CPU-bound. Scale horizontally based on CPU utilization > 60%.
- **Redis (Geohashing)**: Single-threaded CPU bound. Use Redis Cluster if the driver pool exceeds 50,000 active concurrent drivers in a single region.
- **WebSockets**: Memory bound. Require a sticky-session load balancer or a Redis adapter to broadcast events across multiple API pods.
- **PostgreSQL**: Connection bound. MUST deploy PgBouncer or RDS Proxy to handle connection pooling from auto-scaling API pods.

## 3. Unmeasured Areas
- Real-world HTTP p95/p99 latency.
- Autoscaling spin-up times.
- Stripe API webhook latency under load.
