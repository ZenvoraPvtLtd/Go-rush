# Phase 0: Current Architecture

## Components
1. **Core Backend (`Backend/`)**: NestJS, Prisma, PostgreSQL, Redis, Socket.io. This is the canonical source of truth for the entire platform.
2. **Customer App (`customer/frontend/`)**: Flutter app. Currently uses some mock data or the redundant `customer/backend/`. Needs migration to Core Backend.
3. **Driver App (`Go-rush-driver-app-main/driver_flutter/frontend/`)**: Flutter app. Currently points to an isolated Python/MongoDB backend. Needs migration to Core Backend.
4. **Admin Panel (`Go-rush_admin_panil-main/frontend/`)**: Next.js app. Currently uses mock data. Needs migration to Core Backend.
5. **Database**: PostgreSQL (Prisma schema located in `Backend/prisma/schema.prisma`).
6. **Realtime Engine**: Socket.io in Core Backend.
7. **Redundant Systems**: 
   - `customer/backend/`
   - `Go-rush-driver-app-main/backend/`
   - `Go-rush_admin_panil-main/backend/` (if it exists)

## Flows
- **Auth**: Fragmented across duplicate backends. Will unify in Core Backend.
- **Dispatch**: Partially implemented in Core Backend.
- **WebSockets**: Implemented in Core Backend but not fully integrated with all clients.
