# Data Ownership Architecture

Analytics MUST NOT become a second source of truth.

## Authoritative Operational Domains
- **User/Customer**: `Users` module (PostgreSQL `User` table)
- **Driver/Partner**: `Drivers` module (PostgreSQL `Driver` table)
- **Ride/Dispatch**: `Rides` module (PostgreSQL `Ride` table)
- **Payment**: `Payments` module (PostgreSQL `paymentStatus`, `paymentId` fields)
- **Tracking/Location**: `Tracking` module (WebSocket / Redis)

## Analytics Domain
Analytics is strictly downstream. It reads from operational sources via events or secure read-replicas (currently querying the operational database directly due to lack of warehouse).

Any updates to a User's state, a Driver's state, or a Ride's state MUST happen in the Operational domain. Analytics only reports these states.
