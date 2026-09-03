# Document Storage Provider

## Secure Cloud Storage
Because Identity Documents are highly sensitive PII, they must be stored in a secure Object Storage provider (e.g., AWS S3).

## Access Protocol
- **Upload:** The backend generates a short-lived Signed Upload URL for the Partner app. The app uploads directly to the bucket, bypassing the backend server to avoid memory flooding.
- **Download/Review:** The Admin Dashboard requests a short-lived Signed Download URL.

**STATUS: BLOCKED / NOT CONFIGURED**. No Cloud Storage credentials have been provisioned in the current environment.
