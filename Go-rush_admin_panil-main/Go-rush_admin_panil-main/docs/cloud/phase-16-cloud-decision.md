# Cloud Provider Decision

**Status:** BLOCKED — CLOUD PROVIDER NOT APPROVED

## Decision Context
At the conclusion of Phase 16, no formal architectural decision has been recorded authorizing AWS, GCP, Azure, or any other Cloud Provider. 

## Minimum Required Infrastructure (Once Authorized)
- **Database:** Managed PostgreSQL Engine (e.g., RDS / Cloud SQL)
- **Cache:** Managed Redis Cluster (e.g., ElastiCache / MemoryStore)
- **Compute:** Serverless or Managed Kubernetes (e.g., Fargate / Cloud Run / EKS)
- **Secrets:** Hardware-backed secrets manager (e.g., AWS Secrets Manager)

*Provisioning of cloud infrastructure remains halted pending authorization.*
