# Case Messaging & Internal Notes

## Strict Privacy Boundary
All `CaseMessage` rows must explicitly declare their visibility:
- `CUSTOMER_VISIBLE`: The Customer/Partner who created the case can read it.
- `INTERNAL_NOTE`: ONLY authorized Admin Support Agents can read it.

A Customer API request for `GET /cases/:id/messages` MUST automatically filter out all `INTERNAL_NOTE` rows at the database query level to prevent accidental leakage.
