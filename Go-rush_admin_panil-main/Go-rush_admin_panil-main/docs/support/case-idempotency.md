# Case Idempotency & Duplicate Prevention

## Duplicate Detection
Customers often spam the "Submit" button when angry. 
The API enforces an `Idempotency-Key` requirement for case creation. If a Customer submits the exact same payload twice within 5 seconds, the database safely ignores the duplicate and returns the original `caseNumber`.

## Case Merging (Future)
We currently do NOT automatically merge cases, as business policies regarding identical cases submitted days apart are undefined.
