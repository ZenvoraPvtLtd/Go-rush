# End-to-End Certification

| Test ID | Scenario | Expected Result | Actual Result | Status | Evidence | Environment |
|---------|----------|-----------------|---------------|--------|----------|-------------|
| E2E-001 | Customer Login | Valid JWT Returned | - | BLOCKED | Missing DB | STAGING |
| E2E-002 | Partner Login | Valid JWT Returned | - | BLOCKED | Missing DB | STAGING |
| E2E-003 | Create Ride | Ride STATUS: REQUESTED | - | BLOCKED | Missing DB | STAGING |
| E2E-004 | Dispatch Offer | Driver receives Offer | - | BLOCKED | Missing WS | STAGING |
| E2E-005 | Accept Offer | Ride assigned to Driver | - | BLOCKED | Missing DB | STAGING |
| E2E-006 | Start Ride | Ride STATUS: STARTED | - | BLOCKED | Missing DB | STAGING |

**Note:** All tests are currently BLOCKED pending successful infrastructure provisioning and database migrations.
