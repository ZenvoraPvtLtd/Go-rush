# Operational Restrictions

## Purpose
A generic control mechanism for temporary or indefinite suspension of fleet entities.

## Structure
- `targetType`: DRIVER, VEHICLE, ZONE
- `targetId`: UUID
- `reason`: String explanation
- `status`: ACTIVE, REVOKED

When a Driver or Vehicle receives an ACTIVE restriction, it acts as a hard block on Dispatch eligibility.
