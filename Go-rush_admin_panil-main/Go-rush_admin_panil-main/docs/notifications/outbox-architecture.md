# Transactional Outbox Architecture

## Overview
To guarantee that a notification event is never lost if the server crashes immediately after a Ride update, we use the Transactional Outbox Pattern.

1. **Domain DB Transaction:** The Backend updates the `Ride` status to `RIDE_COMPLETED` AND inserts a row into the `OutboxEvent` table in the *same PostgreSQL transaction*.
2. **Outbox Relay:** A background worker polls the `OutboxEvent` table and hands it to the Notification Service.

This guarantees "At-Least-Once" delivery to the Notification Service, which then relies on Idempotency to prevent duplicates.
