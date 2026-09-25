# Support Architecture

## Overview
Outlines the customer/driver support ticket lifecycle managed directly within the canonical backend, offering a structured alternative to ad-hoc phone support.

## Ticket Lifecycle
1. **Creation**: Client calls `POST /api/v1/support/tickets` attaching `ride_id` (optional) and category.
2. **Assignment**: Tickets are placed in a Redis queue and routed to available `SUPPORT_ADMIN` personnel.
3. **Messages**: `POST /api/v1/support/tickets/:id/messages` supports bidirectional chat between admin and user.
4. **Realtime**: `support.ticket.updated` WebSocket events notify clients when an admin replies.

## Security & Auditing
- **Visibility**: Admins can only view tickets within their assigned region/category based on RBAC constraints.
- **Audit**: Every state change (e.g., OPEN to RESOLVED) is written to the global PostgreSQL `audit_logs` table.
- **Immutability**: Support chat messages cannot be deleted by either the customer or the admin once submitted.
