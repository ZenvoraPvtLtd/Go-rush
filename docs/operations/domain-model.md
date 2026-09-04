# Fleet Domain Model

## Core Operational Entities

### Vehicle
- **Fields**: `id`, `registrationNumber`, `make`, `model`, `status`, `partnerId` (optional for independent drivers)
- **Status**: `ACTIVE`, `INACTIVE`, `MAINTENANCE`, `SUSPENDED`

### VehicleAssignment
- **Purpose**: Maps a Driver to a Vehicle.
- **Rules**: Enforces exactly one active assignment per driver at any given time via constraints and application logic.

### Zone
- **Purpose**: Represents an operational geographic area.
- **Fields**: `id`, `name`, `status`. (Polygon boundaries deferred due to DB PostGIS dependency).

### VehicleInspection
- **Purpose**: Tracks operational readiness of a vehicle.
- **Fields**: `id`, `vehicleId`, `status` (`PASSED`, `FAILED`, `EXPIRED`), `expiresAt`.

### MaintenanceRecord
- **Purpose**: Logs vehicle services.
- **Fields**: `id`, `vehicleId`, `description`, `performedAt`.

### OperationalRestriction
- **Purpose**: Temporarily restricts operations for a driver or vehicle.
- **Fields**: `id`, `targetType` (DRIVER/VEHICLE), `targetId`, `reason`, `status`.

### FleetAuditEvent
- **Purpose**: Immutable operational mutation history.
- **Fields**: `id`, `action`, `actorId`, `targetId`, `metadata`.
