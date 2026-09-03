# Database Boundary

To prevent split-brain issues or out-of-sync financial/trip data:
- **GoRush Core (`Backend/`)** maintains the singular authoritative database using PostgreSQL + PostGIS (via Prisma).
- **Customer Backend (`customer/backend/`)** does NOT maintain a separate, duplicated PostgreSQL database for core entities like Users, Drivers, or Rides.
- Redis may be used locally in the Customer Backend for ephemeral state (rate limiting, caching) but NOT for authoritative financial data.
