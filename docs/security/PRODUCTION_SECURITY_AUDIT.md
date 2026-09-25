# Production Security Audit

## Overview
This document serves as the canonical record of the GoRush Production Security standards. 

## Search & Remediation Summary
An automated audit was initiated against the GoRush repository to identify and strip insecure implementations:
- **Hardcoded Secrets**: Any discovered JWT secrets, database connection strings, API keys, or payment credentials in `src/` or `frontend/` have been offloaded to strict `.env` usage. 
- **Wildcard CORS**: CORS headers have been hardened. `*` origins are banned; only specific canonical frontends and admin domains are allowlisted in the NestJS `main.ts` config.
- **Insecure Logging**: Plaintext OTP logs, password inputs, and PII payload logging have been sanitized from `console.log` statements across backend handlers.
- **Debug Endpoints**: `/test`, `/debug`, and mock authentication bypasses have been disabled for production mode.

## Implementation Standards
1. **Password Hashing**: `bcrypt` with a minimum salt rounds of 12.
2. **Tokens**: Short-lived JWT Access Tokens (15 minutes), paired with HttpOnly secure Refresh Tokens.
3. **MFA**: Admin logins mandate Multi-Factor Authentication via TOTP.
4. **Rate Limiting**: IP-based rate limiting (e.g., max 5 login attempts per minute, max 3 OTP requests per 15 minutes).
5. **Request Validation**: NestJS `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` strictly enforced on all DTOs.
6. **Secret Management**: AWS Secrets Manager / Hashicorp Vault to be used for injecting runtime environment variables into the CI/CD pipeline.
