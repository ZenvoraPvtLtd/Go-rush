# Safety Architecture

## Overview
Defines the safety protocol for the GoRush ecosystem, integrating backend-managed SOS triggers and secure real-time sharing.

## Emergency SOS
- **Trigger**: Customer or Driver hits SOS button in the app.
- **API**: `POST /api/v1/safety/sos`
- **Actions**:
  1. Escalates priority to highest tier in the Admin Ops panel.
  2. Emits `sos.created` WS event to Admin namespace.
  3. Triggers automated FCM/SMS to the user's pre-registered Emergency Contacts.

## Family Live Sharing
GoRush does NOT rely on native WhatsApp/OS live locations to prevent tracking unreliability. 
- **Generation**: User generates a tracking link via `POST /api/v1/safety/share`.
- **Link**: Returns a secure, cryptographic URL (e.g., `gorush.com/track/xyz123`).
- **Authorization**: The tracking link uses a stateless JWT payload for authorization.
- **Expiry**: Tracking link expires immediately when the ride status reaches `COMPLETED` or `CANCELLED`.
- **Revocation**: Customer can manually call `DELETE /api/v1/safety/share/:id` to instantly kill the link.
