# Asset Inventory

| Asset | Owner | Sensitivity | Storage | Exposure | Required Controls |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Passwords** | Users/Auth Service | RESTRICTED | PostgreSQL | None | Bcrypt Hash, no logging |
| **JWT Secrets** | SecOps | RESTRICTED | Env Variable | Server-side only | Secure Injection, Rotation |
| **Location Data** | Location Service | CONFIDENTIAL | PostgreSQL/Redis | Auth APIs | RBAC, TTL Expiry |
| **KYC Documents** | Compliance | RESTRICTED | S3/Object Storage | Signed URLs | Encryption at rest |
| **OTP Codes** | Auth Service | CONFIDENTIAL | PostgreSQL | SMS/Email only | Expiry, No logging |
