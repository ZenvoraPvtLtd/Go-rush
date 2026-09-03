# GoRush Phase 1 Audit

## 1. Existing Architecture & Technologies
- **Core Backend (`Backend/`)**: NestJS backend leveraging `@nestjs/bullmq` for queues, `@nestjs/platform-socket.io` for websockets (tracking), and Prisma (`@prisma/client` PostgreSQL) as the ORM. Uses `ioredis` for caching/geo-tracking.
- **Admin Panel (`frontend/`)**: Next.js (App Router), React 19, Tailwind CSS v4, Axios.

## 2. Reusable Components & Capabilities
- **Backend Prisma Setup**: Already includes `User`, `Driver`, `Admin`, `Ride` entities.
- **Backend Redis/WebSocket**: Built-in modules for tracking and redis connection pooling, which should remain centralized rather than replicated fully in the customer backend.
- **Authentication**: JWT & Passport are established in the core backend.

## 3. Risks & Conflicts
- **Duplication of Truth**: Creating a completely separate Prisma setup in the customer backend risks state drift. We will adhere to a modular boundary approach where Customer Backend interfaces with the Core Backend for authoritative data.
- **Admin Panel Routing**: Admin panel is located in `frontend/`, not `admin/`. Changing this would break existing configurations.

## 4. Migration Considerations
- The customer platform will operate in `customer/frontend` (Flutter) and `customer/backend` (NestJS).
- It will eventually communicate with `Backend/` for dispatch and authoritative ride state.

## 5. Files Intentionally Preserved
- **Admin Panel**: `frontend/*` is left completely intact. No routes or components deleted.
- **Core Backend**: `Backend/*` is left completely untouched. No schemas, modules, or services were removed.
