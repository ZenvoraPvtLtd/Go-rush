# Vehicle Management

## Core Functionality
- **Registration**: Register new vehicles in the operational backend.
- **Lifecycle Status**:
  - `ACTIVE`: Ready for assignment and dispatch.
  - `INACTIVE`: Not currently operational (e.g., driver off shift, unassigned).
  - `MAINTENANCE`: Hard blocker for assignment.
  - `SUSPENDED`: Suspended due to compliance or operational restrictions.

## API Integration
The `VehicleService` exposes standard endpoints for listing and managing vehicle states. State transitions enforce business rules (e.g., cannot move to ACTIVE if Inspection is EXPIRED).
