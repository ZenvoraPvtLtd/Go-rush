# Cloud Security Baseline

## Required Policies
- **Least Privilege:** Backend IAM roles only possess `CONNECT` privileges to the DB, and `READ` to Secrets Manager.
- **No Hardcoded Credentials:** Absolute prohibition of `.env` files in git or runtime container images.
- **Audit Logging:** CloudTrail or Cloud Audit Logs must be forcefully enabled on the Staging environment.
- **Encryption in Transit:** Strict TLS 1.2+ minimum on Load Balancers.
- **Encryption at Rest:** Default AWS KMS / Cloud KMS on RDS and ElastiCache.
