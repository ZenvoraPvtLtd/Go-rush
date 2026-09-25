# Current Architecture Map

## Architecture Tree

- **Go-rush/**
  - **Backend/**: Canonical NestJS Backend (Production Source of Truth) [IMPLEMENTED]
    - Database: PostgreSQL/PostGIS (Prisma)
    - Realtime: WebSockets / Socket.io
    - Queues: Redis / BullMQ
  - **frontend/**: Admin Panel / Web (Next.js) [STRUCTURAL]
  - **customer/**: 
    - **frontend/**: Customer Flutter App [STRUCTURAL]
    - **backend/**: Duplicate NestJS Backend (TypeORM) [BLOCKED/CONFLICT]
  - **Go-rush-driver-app-main/** (Imported Driver):
    - **driver_flutter/**: Driver/Partner Flutter App [STRUCTURAL]
    - **chatbot_driver_backend/**: Duplicate Python Backend [BLOCKED/CONFLICT]
  - **Go-rush_admin_panil-main/** (Imported Admin): Duplicate Admin App [BLOCKED/CONFLICT]
  - **docs/**: Documentation

## Protected Paths
The following must NOT be overwritten:
- `customer/`
- `Backend/`
- `frontend/`
