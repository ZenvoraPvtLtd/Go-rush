# Test Environment Matrix

| Environment | Database | Redis | External Providers | Realtime | Payments | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **LOCAL E2E** | Local PostgreSQL | Local Redis | Mocked / Bypassed | Socket.io Local | Bypassed | **ACTIVE** |
| **STAGING E2E** | RDS/Cloud SQL | Elasticache | Sandbox Configured | Cloud Websockets | Stripe Test | **BLOCKED** |
| **PRODUCTION E2E** | Production DB | Production Cache | Real Services | Cloud Websockets | Stripe Live | **BLOCKED** |

> [!WARNING]
> Due to the lack of provisioned cloud credentials (AWS/GCP), the STAGING and PRODUCTION environments cannot be provisioned or tested. Testing is restricted to the LOCAL E2E environment.
