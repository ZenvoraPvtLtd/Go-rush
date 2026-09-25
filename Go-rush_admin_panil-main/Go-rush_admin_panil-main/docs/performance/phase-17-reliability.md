# Reliability Matrix

| Failure | Expected Behavior | Actual Behavior | Status | Recovery Method |
|---|---|---|---|---|
| PostgreSQL Unavailable | API returns `503 Service Unavailable`. | NOT MEASURED | BLOCKED | Automated RDS Failover (Multi-AZ) |
| Redis Unavailable | WebSocket fallback to polling / `503`. | NOT MEASURED | BLOCKED | ElastiCache Auto-Recovery |
| Customer Mobile Disconnect | Ride state persists on server; restores on reconnect. | NOT MEASURED | BLOCKED | GET `/ride/current` on App Resume |
| Partner Mobile Disconnect | Ride offer expires safely on server if not accepted. | NOT MEASURED | BLOCKED | Dead-letter Queue timeout |
