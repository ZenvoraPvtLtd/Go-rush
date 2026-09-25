# Fail-Safe Behavior

## Graceful Degradation
If the external Risk ML Provider (e.g., Sift/Stripe Radar) is down, or if the internal Risk Engine crashes, the system must NOT automatically block all legitimate users.

### Policy
- **Authentication:** Fail-Open (allow login, flag for asynchronous review).
- **Ride Creation:** Fail-Open (allow booking, flag for asynchronous review).
- **Payment Processing:** Fallback to existing Payment Gateway's native fraud limits.

The system relies on asynchronous Outbox Events to eventually catch up when the engine recovers.
