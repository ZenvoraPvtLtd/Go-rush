# GoRush Environments Architecture

## 1. Environment Definitions
- **DEVELOPMENT:** Local developer machines and ephemeral PR environments. Mocks enabled, debug logging, local Redis/Postgres.
- **STAGING:** Production-mirror environment. Connects to isolated staging database and staging Redis. Used for pre-release validation and QA. No real money or real drivers.
- **PRODUCTION:** Live system. Connected to canonical production database. No mock behavior allowed. All debug flags forcefully disabled.

## 2. strict Isolation Requirements
- The STAGING environment MUST NOT share a database cluster with PRODUCTION.
- PRODUCTION mobile apps must explicitly target `api.gorush.com` and must never point to `localhost` or `api-staging.gorush.com`.
- Feature flags (e.g., `ENABLE_FAMILY_SHARING`) are managed via environment variables per environment.
