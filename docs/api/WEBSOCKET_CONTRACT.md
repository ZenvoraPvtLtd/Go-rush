# WebSocket / Realtime Contract

## Events
- `ride.requested`
- `ride.offer.created`
- `ride.assigned`
- `ride.status.changed`
- `driver.location.updated`
- `payment.updated`

## Rules
- Clients must authenticate on connection.
- Clients must support state resync via HTTP upon reconnect.