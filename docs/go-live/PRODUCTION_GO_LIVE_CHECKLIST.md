# Production Go-Live Checklist

| Ref | Category | Item | Owner | Evidence | Status | Blocker |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A | Infrastructure | Cloud AWS/GCP nodes provisioned | DevOps | No AWS credentials. | BLOCKED | Provisioning |
| B | Networking | VPC, Subnets, Security Groups | DevOps | No AWS credentials. | BLOCKED | Provisioning |
| C | DNS | Custom domain routed | SRE | No Route53 configuration. | BLOCKED | Provisioning |
| D | TLS | SSL/TLS certificates issued | SRE | No ACM certificates. | BLOCKED | Provisioning |
| E | Database | Production PostgreSQL cluster | DBA | No RDS cluster. | BLOCKED | Provisioning |
| F | Redis | Production Elasticache/Redis cluster| DBA | No Elasticache cluster. | BLOCKED | Provisioning |
| G | Backend | NestJS services built & deployed | Backend | Local build passes, no prod deploy. | PARTIAL | Deployment |
| H | Workers | BullMQ workers running | Backend | Local only. | PARTIAL | Deployment |
| I | WebSockets | Realtime socket connections load-tested | Backend | Architected, not stress tested. | NOT MEASURED| Infrastructure |
| J | Customer App | Flutter app compiled for release | Mobile | `ENOSPC` compilation crash. | BLOCKED | `ENOSPC` |
| K | Partner App | Flutter app compiled for release | Mobile | `ENOSPC` compilation crash. | BLOCKED | `ENOSPC` |
| L | Admin | Next.js portal deployed | Frontend | Local only. | BLOCKED | Deployment |
| M | Authentication | Passwords hashed, JWT secure | Security | Phase 29 Code Audit | PASS | None |
| N | Authorization | RBAC constraints enforced | Security | Phase 29 Code Audit | PASS | None |
| O | Payments | Stripe Production Keys Configured | Finance | Mocked/Bypassed | NOT CONFIGURED| Business |
| P | Notifications | FCM/SendGrid Configured | Product| Mocked/Bypassed | NOT CONFIGURED| Business |
| Q | Safety | Family location sharing logic | Backend | Phase 9 Implementation | PASS | None |
| R | KYC | Identity verification provider | Risk | Mocked/Bypassed | NOT CONFIGURED| Business |
| S | Risk | ML fraud scoring active | Risk | Mocked/Bypassed | NOT CONFIGURED| Business |
| T | Growth | Coupon & Promo codes active | Marketing| Local API verified | PASS | None |
| U | Analytics | Outbox event delivery | Data | Phase 26 Implementation | PASS | None |
| V | Monitoring | Datadog/Prometheus dashboards | SRE | No cloud monitors. | NOT CONFIGURED| Infrastructure |
| W | Backups | Database automated backups | DBA | No RDS instances. | NOT CONFIGURED| Infrastructure |
| X | DR | Disaster Recovery Restore tested | SRE | No infrastructure. | NOT EXECUTED| Infrastructure |
| Y | Security | Zero P0 vulnerabilities in code | Security | Phase 29 Remediation | PASS | None |
| Z | CI/CD | automated deployment pipeline | DevOps | Local disk space failure. | BLOCKED | `ENOSPC` |
| AA| Rollback | Revert strategy documented | DevOps | Database rollback tested locally. | PASS | None |
| AB| Incident Resp | SRE Runbooks created | SRE | Phase 31 Runbooks | PASS | None |
| AC| Business Dec. | RTO, Limits, Budgets finalized | Exec | SLA targets remain undefined. | REQUIRED | Business |
