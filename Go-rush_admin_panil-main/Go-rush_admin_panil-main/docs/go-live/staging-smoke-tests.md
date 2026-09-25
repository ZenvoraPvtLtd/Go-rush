# Staging Smoke Tests

| ID | Test | Expected |
|---|---|---|
| SMOKE-001 | Health Check | `200 OK` on `/health/ready` |
| SMOKE-002 | Customer Login | Valid JWT |
| SMOKE-003 | Partner Login | Valid JWT |
| SMOKE-004 | Ride Creation | Ride Status: REQUESTED |
| SMOKE-005 | Dispatch | Driver receives Push Notification |
| SMOKE-006 | Ride Accept | Ride Assigned, Customer Notified |
| SMOKE-007 | Realtime Tracking | WS connection established, lat/lng flowing |
| SMOKE-008 | Ride Complete | Status: COMPLETED, Invoice Generated |
