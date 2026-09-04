# Threat Model (STRIDE)

| Threat | Asset | Attack Surface | Likelihood | Impact | Existing Control | Remediation (Phase 29) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Spoofing** User Identity | JWT / API | Login Endpoints | High | High | Passwords were plaintext | **REMEDIATED**: Implemented Bcrypt hashing. |
| **Information Disclosure** | OTP Codes | Auth Service Logs | Medium | High | OTP logged to console | **REMEDIATED**: Removed OTP console.log. |
| **Tampering** Data | Database | Prisma API | Low | High | Parameterized Queries | Native Prisma protection. |
| **Elevation of Privilege**| Admin API | Admin Controllers | Medium | High | `JwtAuthGuard` | Needs strict RBAC checks per controller. |
| **Information Disclosure** | JWT Secret | Source Code | Low | Critical | Hardcoded string | **REMEDIATED**: Migrated to `process.env.JWT_SECRET`. |
