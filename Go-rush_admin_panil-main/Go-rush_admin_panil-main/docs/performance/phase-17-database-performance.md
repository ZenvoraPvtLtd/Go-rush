# Database Performance

**Status:** BLOCKED

## Canonical Indexes
The following indexes are designed to optimize core queries:
- `Ride (status)`
- `Ride (customerId)`
- `Ride (driverId)`
- `DriverOffer (rideId)`
- `DriverOffer (status)`

## Resource Limits
- **Connection Pooling:** Prisma Client is configured to utilize connection pooling to prevent max-connection exhaustion during traffic spikes.
- **Pagination:** All Admin `GET` requests for collections (Users, Rides) MUST implement standard offset/cursor pagination. No unbounded `SELECT *` queries.

*Dynamic database execution speed is NOT MEASURED (Blocked by Missing Staging Database).*
