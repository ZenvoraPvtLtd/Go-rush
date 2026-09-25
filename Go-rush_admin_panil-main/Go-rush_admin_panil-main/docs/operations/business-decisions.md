# Business Decision Register

## Unresolved Decisions

- **One-Driver-One-Vehicle Rule**: BUSINESS DECISION REQUIRED. For safety, the current implementation strictly enforces one active assignment per driver. This may need adjustment if fleet operators allow hot-swapping within shifts.
- **Partner Fleet Ownership Model**: BUSINESS DECISION REQUIRED. The `Partner` entity is currently missing. Vehicle has an optional `partnerId` as a string for future expansion.
- **Shift Scheduling**: BUSINESS DECISION REQUIRED. Shift and duty hours are currently omitted to avoid inventing unverified labor law rules.
- **Maintenance Policy & Telemetry**: BUSINESS DECISION REQUIRED. No live odometer or IoT telemetry is configured. Maintenance relies on manual Admin entry.
- **Inspection Frequency**: BUSINESS DECISION REQUIRED. Expiration of inspections requires manual tracking or offline CRON until a legal policy is formalized.
- **Operational Restriction Duration**: BUSINESS DECISION REQUIRED. Restrictions currently remain ACTIVE until manually revoked.
