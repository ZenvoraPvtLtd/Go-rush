# Vehicle Inspections

## Purpose
Ensure operational readiness distinct from legal KYC compliance.

## Integration
- Handled via `VehicleInspection` model.
- Includes `inspectionType`, `status`, and `expiresAt`.
- Vehicle cannot be `ACTIVE` if mandatory operational inspections are `FAILED` or `EXPIRED`.
