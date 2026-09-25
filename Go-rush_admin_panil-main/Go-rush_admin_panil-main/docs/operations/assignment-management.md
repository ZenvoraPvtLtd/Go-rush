# Assignment Management

## The Invariant
A Driver can only be assigned to ONE active vehicle at any given time. A Vehicle can only have ONE active driver at any given time.

## Concurrency Protection
The backend `OperationsService` uses database transactions to guarantee assignment safety. When assigning a vehicle, it explicitly checks for existing `ACTIVE` assignments for both the Driver and the Vehicle within a transactional lock.

## Audit Trail
Every assignment creation or termination creates a `FleetAuditEvent` linking the actor (Admin), driver, and vehicle.
