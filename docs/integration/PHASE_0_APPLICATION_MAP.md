# Phase 0 - Application Map

| Application | Actual Path | Technology | Current API | Current Backend | Database | Realtime | Build System | Test System |
|---|---|---|---|---|---|---|---|---|
| Customer App | `Go-rush/customer/frontend/` | Flutter/Dart | `localhost:4000/v1` (legacy) | NestJS Canonical | N/A (Client) | Socket.IO | Flutter SDK | Flutter Test |
| Driver App | `Go-rush/Go-rush-driver-app-main/driver_flutter/frontend/` | Flutter/Dart | `10.0.2.2:4000` | NestJS Canonical | N/A (Client) | Socket.IO | Flutter SDK | Flutter Test |
| Admin Panel | `Go-rush/frontend/` | Next.js/React | `3001/v1` | NestJS Canonical | N/A (Client) | WebSockets | npm/Next.js | N/A |
