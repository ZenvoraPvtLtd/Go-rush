# Staging Database Architecture

## Configuration
- **Host:** TBD (Pending Cloud Provisioning)
- **Database:** `gorush-db-staging`
- **TLS:** Required (sslmode=require)
- **Credential Strategy:** Ephemeral / Secrets Manager injected at runtime. 
- **Migration Strategy:** `npx prisma migrate deploy` executed strictly inside CI/CD against the Staging cluster.

*Status: DESIGNED — NOT DEPLOYED*
