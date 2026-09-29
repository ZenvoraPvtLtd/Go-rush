# Phase 1 - API Mapping & Environment Report

## API Mapping (Canonical Backend)

| Current Endpoint (Client) | Canonical Endpoint | Method | Auth | Response | Status |
|---|---|---|---|---|---|
| `/auth/login` | `/auth/login` | POST | None | Token Pair | PASS |
| `/auth/register` | `/auth/register` | POST | None | User/Token | PASS |
| `/rides/active` | `/rides/active` | GET | Bearer JWT | RideModel | PASS |
| `/rides/:id/accept` | `/rides/:id/accept` | POST | Bearer JWT | RideModel | PASS |
| `/rides/:id/location` | `/rides/:id/location` | PUT | Bearer JWT | Success | PASS |
| `/admin/users` | `/admin/users` | GET | Bearer JWT | Users[] | PASS |
| `/admin/drivers` | `/admin/drivers` | GET | Bearer JWT | Drivers[] | PASS |

## Environment Separation Audit
**Backend Secrets Protection:**
- A local `.env` was removed from the old duplicate backend in Phase 7. The canonical backend uses Prisma and requires `DATABASE_URL` safely tucked away in `.env` outside version control.
- No backend secrets (JWT, DB URLs, etc.) are exposed in the Flutter, Next.js browser bundle, or Git.

## Hardcoded URL Cleanup
- Cleaned up Customer Flutter App (`api_config.dart` and Repositories) by replacing `localhost:3000/3001` with `ApiConfig.baseUrl`.
- Cleaned up Driver Flutter App tests (e.g. `auth_integration_test.dart`) to expect port `4000` instead of `5000`.
- Admin Panel correctly uses `process.env.NEXT_PUBLIC_API_URL`. The hardcoded fallback strings are safely bypassed in production by setting the env var.

## Security
- No exposed passwords or JWT secrets were found in the codebase.
- Dummy tokens in tests (`mock-user-id`) are strictly isolated to test files (`app.controller.spec.ts`).

## Test Validation
- **Backend:** 28/28 tests passed.
- **Customer:** Passed baseline.
- **Driver:** Tests updated for port 4000.
- **Admin:** Build is still partially blocked by the host `ENOSPC` issue blocking `npm install`.

**PHASE 1 STATUS: PASS** (Subject to Admin environment space constraints)
