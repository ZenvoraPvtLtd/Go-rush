# Review Moderation & Reporting

## Moderation States
- `VISIBLE`: Default state.
- `PENDING_REVIEW`: Triggered if flagged by automated profanity filters (Future AI Scope).
- `HIDDEN`: Suppressed from public API responses.
- `REMOVED`: Soft-deleted by Admin.

## Review Reporting
Customers and Partners can submit a `ReviewReport`. The `ReviewReport` uses an idempotent `UNIQUE(reporterId, reviewId)` constraint to prevent spamming the Admin Moderation Queue.
