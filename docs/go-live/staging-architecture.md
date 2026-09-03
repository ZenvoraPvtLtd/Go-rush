# Staging Architecture

STAGING INFRASTRUCTURE: **NOT PROVISIONED**

## Required Staging Environment Design
- **API URL:** `api-staging.gorush.com`
- **Customer Frontend:** Pointing to staging API. Installed internally via TestFlight/Firebase App Distribution.
- **Partner Frontend:** Pointing to staging API. Installed internally.
- **Database:** `gorush-db-staging` (RDS / Cloud SQL) - MUST be physically isolated from the production database.
- **Redis:** `gorush-redis-staging` (ElastiCache / MemoryDB).
- **Test Data:** Strict synthetic data. NO production PII is allowed in this environment.

*(Currently blocked from dynamic creation due to ENOSPC and lack of cloud provider provisioning scripts).*
