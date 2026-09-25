# Production Database Architecture

## Canonical Source of Truth
- **Database**: PostgreSQL 16+
- **Geospatial Engine**: PostGIS extension enabled.
- **ORM**: Prisma (NestJS Canonical Backend).

## Audit & Deprecation
The following local or prototype databases are officially **DEPRECATED** for production use:
- `SQLite` (Found in `customer/backend`)
- `MongoDB` (Found in legacy driver backend scripts)
- `Local JSON` arrays (Used for mock frontend components)

*Note: These may only be utilized as isolated, non-production test fixtures if absolutely required by local dev environments.*

## Hardening Standards
1. **Migrations**: Prisma migration files (`prisma/migrations`) are the sole method for schema mutations. Manual DB alterations are prohibited.
2. **Indexing**: B-Tree indexes applied on high-lookup columns (`user_id`, `status`). GiST indexes applied on PostGIS geometries (`location`).
3. **Foreign Keys**: Strict referential integrity. No orphaned rides or orphaned wallets permitted.
4. **Soft Deletes**: Implemented via a `deleted_at` timestamp. Records like Users and Rides are never physically `DELETE`d to maintain ledger referential integrity.
5. **Audit Trail**: Trigger-based PostgreSQL audit tables capture all changes to financial and identity rows.
6. **Connection Pooling**: PgBouncer (or Prisma Accelerate) utilized to manage high-volume ephemeral Socket/HTTP connections.
