# Schema Evolution

## Strategy
Breaking schema changes must not silently break analytics consumers.

- **Backward Compatibility**: Additive changes only. Do not drop columns without deprecation.
- **Versioning**: Events must contain `eventVersion` (e.g., `1.0`).
- **Migration**: Schema migrations must use Prisma and be reviewed for downstream impact.

## Event Schema Evolution
When an operational domain changes an entity (e.g., adding `vehicleType` to `Driver`), the `driver.updated` event schema increments its version or adds the optional field backward-compatibly.
