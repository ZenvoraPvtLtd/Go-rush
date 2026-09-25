# Notification & OTP Provider Architecture

## Overview
This defines the abstraction layer for all outbound communications (FCM Push, SMS, WhatsApp, Email). All integrations are hidden behind interface contracts in the Canonical Backend to allow swapping providers (e.g., Twilio to MessageBird) without changing core business logic.

## Abstraction Layer
- `INotifierService`: Interface exposing `sendPush()`, `sendSMS()`, `sendEmail()`, `sendWhatsApp()`.
- **Event-Driven**: Notifications are triggered asynchronously via Redis Pub/Sub or BullMQ workers listening to domain events (`ride.assigned`, `payment.updated`).

## OTP Security
- **Providers**: Sent via standard SMS or WhatsApp providers.
- **Expiry**: OTPs expire automatically in 300 seconds (managed by Redis TTL).
- **Rate Limiting**: Max 3 OTP requests per phone number per 15 minutes.
- **Attempt Limit**: Max 3 verification attempts per OTP before invalidation.
- **Replay Protection**: Verified OTPs are immediately deleted from Redis.
- **Logging**: Plaintext OTPs are explicitly masked in stdout/audit logs (e.g., `OTP sent: ***39`).

## Provider Failures
The abstraction supports fallback routing (e.g., if WhatsApp API fails, failover to SMS API) and uses exponential backoff for FCM delivery failures.
