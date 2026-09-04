# Security

## Architecture
- Analytics endpoints must require Admin authentication (e.g., Bearer tokens validated by the NestJS Auth module).
- Exports: Signed temporary URLs (S3) - NOT CONFIGURED.
- SQL Injection: Prisma ORM is used safely.
- Object-level authorization: Enforced via `Admin` token roles (RBAC missing, basic admin check implemented).

## Findings
- Secret scanning: No exposed credentials in source code.
- Data Exposure: Analytics endpoints will strictly return aggregated data, not raw PII dumps.