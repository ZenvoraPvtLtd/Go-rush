# Duplicate Systems Audit

## Backend Implementations
- **Canonical**: `Backend/` (NestJS + Prisma + Redis + WebSockets)
- **Duplicate 1**: `customer/backend/` (NestJS + TypeORM)
- **Duplicate 2**: `Go-rush-driver-app-main/chatbot_driver_backend/` (Python/FastAPI)

## Admin Panels
- **Canonical Candidate**: `frontend/` (Next.js)
- **Duplicate**: `Go-rush_admin_panil-main/`

## User/Ride/Driver Models
- **Canonical**: Models in `Backend/prisma/`
- **Duplicate**: Models defined in `customer/backend/` (TypeORM entities) and `chatbot_driver_backend/` (SQLAlchemy/Alembic)

## WebSocket Implementations
- **Canonical**: `@nestjs/platform-socket.io` in `Backend/`
- **Duplicate**: Unverified Socket logic in Python backend or customer backend.

## Databases
- **Canonical**: PostgreSQL/PostGIS configured via Prisma in `Backend/`
- **Duplicate**: SQLite/PG in `customer/backend/`, SQLAlchemy DB in Python driver backend.

Canonical Production Backend = GoRush Core Backend
