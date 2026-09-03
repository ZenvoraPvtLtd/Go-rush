# Case Architecture

## Ownership Boundary
The Support Domain owns the `SupportCase` entity and its conversation history. 
It does NOT own the `Ride` or `Payment`. It strictly maintains foreign-key references to those domains. Support Agents CANNOT directly mutate a `Payment` status from `FAILED` to `SUCCESS`; they must trigger an authorized Payment Workflow.

## Canonical Entity
- `id`: UUID (Immutable)
- `caseNumber`: String (e.g. GR-CASE-10294)
- `requesterId`: UUID (Customer or Partner)
- `category`: Enum (Pending Business Rules)
- `status`: Enum (`OPEN`, `ASSIGNED`, `RESOLVED`)
- `relatedRideId`: UUID (Optional)
- `relatedPaymentId`: UUID (Optional)
