# Enterprise Event Catalog

> **Note:** These are conceptual events based on the current authoritative domain models. An actual event broker is currently **NOT CONFIGURED**.

## Customer Events
- `customer.created`
- `customer.updated`

## Driver Events
- `driver.created`
- `driver.status.updated` (ONLINE, OFFLINE)

## Ride Events
- `ride.requested`
- `ride.assigned`
- `ride.started`
- `ride.completed`
- `ride.cancelled`
- `ride.payment.updated`

## Missing Domains (BLOCKED)
The following events are not supported by the current operational domain and are therefore excluded:
- `driver.offer.created` (No dispatch offer engine)
- `ledger.entry.created` (No ledger)
- `support.case.created` (No support system)
- `risk.signal.created` (No risk engine)
