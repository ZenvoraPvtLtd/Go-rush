# Database Architecture

## 1. Canonical Store
- **Engine:** PostgreSQL 16+.
- **Authority:** PostgreSQL is the sole authoritative source of truth for all durably stored entities: Users, Partners, Rides, Vehicles, and Invoices.
- **Transactions:** Ride Booking (`POST /rides`) and Dispatch Acceptance (`POST /offers/:id/accept`) MUST use explicit database transactions to prevent race conditions. Double-booking a driver will result in a transactional rollback.

## 2. Migrations
- Executed via Prisma ORM (`npx prisma migrate deploy`).
- Run securely inside the CI/CD pipeline against the target environment.
- Never run development migration commands (`migrate dev`) against production.

## 3. Backup & Recovery
- **RPO (Recovery Point Objective):** 5 minutes (using Point-In-Time-Recovery / WAL archiving).
- **RTO (Recovery Time Objective):** 30 minutes.
- **Testing:** Database restoration from backups must be verified quarterly.
