# Notification Idempotency

## Double-Send Prevention
Because the Outbox Relay guarantees "At-Least-Once" delivery, it may occasionally deliver the same `eventId` twice.

The `Notification` table utilizes a `UNIQUE(eventId, recipientId, channel)` constraint.
If the Outbox worker replays `RideCompleted.v1` for `Customer A` over the `PUSH` channel, the database will silently reject the duplicate insert, preventing the Customer from receiving two push notifications for the same ride.
