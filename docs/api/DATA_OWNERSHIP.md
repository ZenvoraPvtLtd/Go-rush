# Data Ownership Contract

- **PostgreSQL**: Authoritative durable business state (canonical).
- **Redis**: Hot/realtime/dispatch state.
- **Backend**: Single source of truth for business rules & state transitions.
- **Clients (Customer/Driver/Admin)**: Presentation state only. NEVER authoritative for ride state, earnings, or payments.