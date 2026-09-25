# Repository Baseline

## Status
- **Customer Frontend**: VERIFIED (Flutter)
- **Customer Backend**: VERIFIED (NestJS + TypeORM) - Duplicate
- **Partner Frontend/Backend**: MISSING (Partner directory not found directly, driver app exists in import)
- **Core Backend**: VERIFIED (NestJS + Prisma + BullMQ + Redis + Socket.io)
- **Existing Admin Frontend**: VERIFIED (Next.js in `frontend/`)
- **Imported Driver**: VERIFIED (`Go-rush-driver-app-main` with Python backend and Flutter app)
- **Imported Admin**: VERIFIED (`Go-rush_admin_panil-main`)

## Canonical Systems
Canonical Production Backend = GoRush Core Backend

## Critical Constraints
- Do not overwrite `customer/`, `Backend/`, `frontend/`
- Do not deploy or push in this phase.
