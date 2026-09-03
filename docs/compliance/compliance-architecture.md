# Compliance Architecture & Domain Ownership

## Ownership Boundary
The Compliance Domain owns the `PartnerComplianceProfile`, `VehicleProfile`, and `ComplianceDocument`. 
It does NOT own the `RideStatus` or `DriverOfferStatus`. 

When a driver attempts to go Online (or accept a dispatch), the Dispatch Domain queries the Compliance Domain via `DriverEligibilityPolicy` to check if `VERIFIED` and `NOT_EXPIRED`.

## Canonical Entity
- `id`: UUID 
- `partnerId`: UUID
- `status`: Enum (`SUBMITTED`, `UNDER_REVIEW`, `VERIFIED`, `REJECTED`, `EXPIRED`, `SUSPENDED`)
- `verifiedAt`: DateTime (nullable)
