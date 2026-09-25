# Family Location Sharing

A primary GoRush safety feature.

## Requirements
- Customer consent is explicit.
- Sessions are time-limited (e.g., 30m, 1hr, or "until ride ends").
- Revocable at any time by the customer.

## Delivery Mechanism
- We abstract delivery behind `FamilyShareDeliveryProvider` (to eventually integrate with WhatsApp Business APIs).
- The client app NEVER generates its own raw share tokens. The server issues a cryptographically secure, time-limited token.
- No public open URLs are exposed without this token.
