# Secrets Management Strategy

## 1. Storage & Access
- **Never commit secrets:** Passwords, API keys (Google Maps, WhatsApp), JWT secrets, and DB connection strings must NEVER exist in `git`.
- **Injection:** Secrets must be injected into the application via environment variables at runtime (`.env` for local, Cloud Secret Manager for Production/Staging).

## 2. Rotation Policy
- **JWT Secrets:** Rotated every 90 days. Old secret kept temporarily in fallback verification pool to avoid invalidating active sessions abruptly.
- **Database Credentials:** Rotated annually or immediately if compromised.

## 3. Redaction
- The application logger MUST automatically redact the strings corresponding to known secrets, auth headers (`Authorization: Bearer ***`), and OTP payloads before printing to STDOUT.
