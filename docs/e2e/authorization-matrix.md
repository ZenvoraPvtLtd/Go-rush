# End-to-End Authorization Matrix

This matrix validates cross-domain RBAC boundaries.

| Persona | Action | Target Resource | Expected Outcome | Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | `GET /rides/:id` | Own Ride | 200 OK | PASS (via IDOR logic) |
| **Customer** | `GET /rides/:id` | Other User's Ride | 403 Forbidden | PASS |
| **Customer** | `POST /admin/fleet` | Fleet Data | 401/403 | PASS (AdminGuard) |
| **Partner** | `PATCH /driver/status` | Own Profile | 200 OK | PASS |
| **Partner** | `GET /customer/profile` | Customer Profile | 403 Forbidden | PASS |
| **Admin** | `GET /rides` | All Rides | 200 OK | PASS (AdminGuard) |
| **Support** | `POST /finance/payout` | Ledger | 403 Forbidden | PASS (Role: SUPPORT) |
| **Finance** | `POST /finance/payout` | Ledger | 200 OK | PASS (Role: FINANCE) |
