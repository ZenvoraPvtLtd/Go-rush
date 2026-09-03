# Concurrency & Idempotency Testing

## Idempotency Rules
The following state-transitions utilize strict Idempotency Keys (or database unique constraints) to prevent duplicate transactions:
1. `Ride Creation`
2. `Offer Acceptance`
3. `Ride Start / Complete`
4. `Wallet Transaction`

## Concurrency Test Scenarios (BLOCKED)
| Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|
| Partner A and B accept same offer | Exactly one succeeds (409 Conflict for loser) | NOT MEASURED | BLOCKED |
| Customer clicks 'Request Ride' twice | Idempotent response (200 OK, same Ride ID) | NOT MEASURED | BLOCKED |
| Partner sends duplicate 'Ride Started' | Idempotent response (200 OK, no error) | NOT MEASURED | BLOCKED |
