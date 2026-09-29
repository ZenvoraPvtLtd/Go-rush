# Phase 7 Repository Map

## Canonical Architecture
- **Canonical Backend**: `Go-rush/Backend/` (NestJS, PostgreSQL, Prisma, Redis)
- **Customer Flutter App**: `Go-rush/customer/frontend/` (Flutter)
- **Driver Flutter App**: `Go-rush/Go-rush-driver-app-main/driver_flutter/frontend/` (Flutter)
- **Admin Panel**: `Go-rush/Go-rush_admin_panil-main/Go-rush_admin_panil-main/frontend/` (Next.js)

## Legacy & Deprecated Dependencies
*The following MUST NOT be used for production APIs, as per Phase 7 rules:*
- `Go-rush/customer/backend/` (Legacy Customer API)
- `Go-rush/Go-rush-driver-app-main/chatbot_driver_backend/` (Legacy AI Backend)
- `Go-rush/Go-rush-driver-app-main/driver_flutter/backend/` (Legacy Driver Backend)
- `Go-rush/frontend/` (Deprecated frontend boilerplate)

## Current Status
- **Backend Database**: PostgreSQL
- **Backend Realtime**: Socket.IO
- **Production Status**: In Integration (Phase 7 initiated)
