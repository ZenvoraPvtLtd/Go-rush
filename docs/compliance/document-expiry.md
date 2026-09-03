# Document Expiry Engine

## Lifecycle
A daily cron job (or asynchronous worker) scans all `ComplianceDocument` records for those where `expiresAt` < NOW().

When a required document (like Insurance) expires:
1. The `ComplianceDocument` status transitions to `EXPIRED`.
2. The overarching `VehicleProfile` status transitions to `EXPIRED` (or suspended).
3. The `DriverEligibilityPolicy` immediately begins rejecting Dispatch offers.

We do NOT invent "Grace Periods" unless explicitly requested by the Legal/Business teams.
