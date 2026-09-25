# Security Guidelines

## Secure Storage
Authentication credentials (Access Tokens, Refresh Tokens) are **never** stored in plain text or `SharedPreferences`.
- **Flutter**: Uses `flutter_secure_storage` to encrypt tokens at rest (using Android Keystore and iOS Keychain).

## Log Redaction
Sensitive data must not be logged:
- OTP codes
- Access/Refresh Tokens
- PII (Phone numbers, exact locations) should be masked in standard operational logs.

## Error Handling
The backend uses structured error codes (e.g., `AUTH_001`, `AUTH_002`) instead of leaking stack traces or internal validation details. The Flutter UI maps these codes to friendly messages.

## API Abuse Prevention
- **Rate Limiting**: The backend will enforce IP and Device-level rate limits on `/v1/auth/send-otp` and `/v1/auth/verify-otp`.
- **OTP Cooldown**: The client UI enforces a 30-second cooldown before a customer can request another OTP, preventing accidental SMS spam.
