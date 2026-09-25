# Payout Provider Decision

**Status:** BLOCKED — PROVIDER NOT APPROVED

## Context
GoRush has not configured a payout gateway (e.g., Stripe Connect, RazorpayX, PayU).
Until a provider is authorized, the API will use a generic `TestPayoutProvider` interface that strictly logs its actions as `TEST ONLY`.
