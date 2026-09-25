# Credential Leak Incident Runbook

## 1. Detection
- Alerts from GitHub Secret Scanning.
- Alerts from Datadog/CloudTrail indicating abnormal API usage.
- External bug bounty reports.

## 2. Containment
- Identify the leaked credential (e.g., JWT Secret, DB Password).
- If Cloud Access Key: Deactivate the key immediately in the Cloud Console.
- If JWT Secret: Rotate the secret in production environment variables and trigger an application restart. (Note: This invalidates ALL current user sessions).

## 3. Investigation
- Query access logs to determine if the credential was successfully used.
- Identify the scope of data accessed.

## 4. Recovery
- Generate new cryptographically secure credentials.
- Deploy to Secrets Manager.

## 5. Post-Incident
- Update `.gitignore` and CI/CD secret scanning rules to prevent recurrence.
