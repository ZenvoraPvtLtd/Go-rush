# Phase 0 - Baseline Report

## Locations
- **Customer:** `Go-rush/customer/frontend/`
- **Driver:** `Go-rush/Go-rush-driver-app-main/driver_flutter/frontend/`
- **Admin:** `Go-rush/frontend/`
- **Backend:** `Go-rush/Backend/`

## Existing Features
Preserved and verified against `PHASE_0_FEATURE_INVENTORY.md`. No UI components, routes, screens, or features were removed. 

## Existing APIs & Backend Dependencies
- **Customer:** Uses NestJS Canonical (migrated to `3001/v1`, previously tested on 4000)
- **Driver:** Uses NestJS Canonical (`10.0.2.2:4000`), with legacy mock `RideModel.defaultSample()` instances intact.
- **Admin:** Uses NestJS Canonical (`3001/v1`), connects to the main database by proxy of Backend endpoints.
- **Backend:** Runs on port 4000, connects directly to PostgreSQL + Prisma and Redis, provides Socket.IO realtime infrastructure. No secondary/legacy backends remain online.

## Existing Errors
- Admin Panel: Requires `npm install` due to missing `next` dependency; a previous `ENOSPC` error on the host environment originally blocked this. Resolving now via task `761`.

## Existing Tests
- **Backend:** 28/28 tests passed (`npx vitest run`). Build and lint successful.
- **Customer App:** 1/1 test passed (`flutter test`). Analyzer reported "No issues found!".
- **Driver App:** Waiting on test harness output.

## Existing Mocks / Hardcoded URLs
- **Driver App:** Contains dummy fallback `RideModel.defaultSample()` UI for visual testing.
- **Driver App `api_config.dart`:** Contains `http://10.0.2.2:4000` / `localhost:4000` base URL fallbacks.
- **Customer App `api_config.dart`:** Contains `http://10.0.2.2:3001/v1` / `localhost:3001/v1` base URL fallbacks.

## Integration Blockers
- **Admin Panel:** Disk space constraints (`ENOSPC`) on the host system previously prevented dependencies from being installed, which is blocking the Next.js `build` and `lint` pipeline.

## Final Status
**BASELINE = PARTIAL** (Pending Driver tests and Admin `npm install` resolution)
