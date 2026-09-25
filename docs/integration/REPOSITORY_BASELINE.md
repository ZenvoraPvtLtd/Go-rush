# Phase 0: Repository Baseline

## Status
- **Customer Flutter App**: Implemented (`customer/frontend/`)
- **Customer Backend**: Implemented but redundant (`customer/backend/` - NestJS)
- **Driver Flutter App**: Implemented (`Go-rush-driver-app-main/driver_flutter/frontend`)
- **Admin Panel**: Implemented (`Go-rush_admin_panil-main/frontend/` - Next.js)
- **Core Backend**: Implemented and Canonical (`Backend/` - NestJS + Prisma + PostgreSQL)
- **Imported Driver Backend**: Implemented but redundant (`Go-rush-driver-app-main/backend/` - Python/FastAPI or MongoDB based)

## Canonical Systems
- **Canonical Production Backend**: `Backend/` (GoRush Core Backend)
- **Database**: PostgreSQL (via Prisma in `Backend/prisma/schema.prisma`)

## Findings
- **Database Schemas**: `Backend/` has `User`, `Driver`, `Admin`, `Ride`, `AnalyticsEvent`, `Vehicle`, `Zone`, etc.
- **Mock Data**: Present in Flutter clients and Next.js Admin Panel.
- **Duplicate Backends**: `customer/backend/` and `Go-rush-driver-app-main/backend/` must be treated as redundant/reference only.

## Constraints
- Existing code in `customer/`, `Backend/`, `frontend/`, `Go-rush-driver-app-main/` must be preserved.
- Clients must only interact with `Backend/`.
