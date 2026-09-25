# Bottleneck Register

| Component | Issue | Impact | Evidence | Recommendation | Status |
|---|---|---|---|---|---|
| Realtime | WebSocket Fan-out | P1 | NOT MEASURED | Ensure Redis Adapter is configured to distribute pub/sub across multiple Node pods. | Requires Business Target |
| Location | GPS Ingestion | P2 | NOT MEASURED | Implement a Redis-backed batching system to write locations to PostgreSQL asynchronously. | Requires Business Target |
| Maps API | Cost & Rate Limits | P1 | NOT MEASURED | Implement server-side caching (TTL 1hr) for duplicate Route/Quote requests. | Requires Business Target |
