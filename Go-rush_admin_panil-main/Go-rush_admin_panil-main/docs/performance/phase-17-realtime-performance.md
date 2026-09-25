# Realtime Performance

**Status:** BLOCKED

## Target Realtime Capacity
*TARGET REQUIRES BUSINESS APPROVAL*
- **Max Concurrent WebSocket connections:** 10,000 (Staging limit: 1,000)
- **Target Location Broadcast Latency:** < 200ms

## Location Ingestion Policy
- **Rate Limit:** 1 GPS packet per second per active driver.
- **Validation:** Packets with `accuracy > 50 meters` are ignored at the ingress layer to prevent backend load.
- **Broadcasting:** Authorized viewers (Customers on active ride, Trusted Contacts) receive the packet via Redis Pub/Sub.

*Dynamic load execution is NOT MEASURED (Blocked by Missing Staging Compute).*
