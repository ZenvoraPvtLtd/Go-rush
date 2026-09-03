# Retry & Dead Letter Queue (DLQ)

## Retry Policy
- **RETRYABLE Errors:** Provider timeouts, 429 Rate Limits, temporary 500/503 errors.
- **NON-RETRYABLE Errors:** 400 Invalid Payload, 401 Unauthorized (bad API key), Revoked Device Token.

## Dead Letter Processing
Retryable errors use an Exponential Backoff strategy (Max Attempts: 5). If all attempts are exhausted, the Notification moves to status `EXHAUSTED` and is pushed to the Dead Letter Queue for Admin review.
