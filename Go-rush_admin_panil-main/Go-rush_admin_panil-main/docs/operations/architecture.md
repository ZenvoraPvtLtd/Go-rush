# Fleet Management Architecture

## Overview
This document defines the Fleet Management and Operations Control Platform architecture. It provides an operational control layer above the existing Driver and Ride domains.

## Principles
1. **No Duplicate State Machines**: Driver eligibility (`isKycApproved`) and operational status are consumed, not duplicated.
2. **Authoritative Boundaries**: Dispatch handles ride assignment. Fleet Operations handles vehicle/driver operational readiness and assignment constraints.
3. **Auditability**: All operational mutations (assignments, restriction changes) must be recorded in an immutable audit log.

## Components
- **Vehicle Management**: Manages vehicle lifecycle (Active, Inactive, Maintenance).
- **Assignment Engine**: Idempotent vehicle-to-driver assignment that enforces "One Driver to One Active Vehicle" constraint.
- **Zone Management**: Geographic service boundaries.
- **Service/Inspection Management**: Tracks vehicle readiness.
- **Operations Overview**: API aggregation for the Admin Control Tower.
