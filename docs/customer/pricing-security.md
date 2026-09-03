# Pricing Security

## Never Trust the Client
1. **No Client Math**: The client cannot submit an updated fare, tax, or discount multiplier.
2. **Ownership Enforcement**: `GET /v1/quotes/:id` validates that the `customerId` tied to the active Auth Token matches the owner of the Quote.
3. **Coordinate Validation**: The API ensures distance and duration metrics fall within realistic geographical constraints.

## Idempotency
Clients generate a unique UUID as an `Idempotency-Key` when requesting a Quote. If a network timeout causes the client to retry the request, the backend safely returns the previously generated quotes instead of duplicating work.
