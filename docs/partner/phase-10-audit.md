# Phase 10 Audit: Partner & Driver Platform Foundation

## 1. Existing Architecture Analysis
- **Core Backend:** Currently housed under `customer/backend/`. It contains authoritative modules for `Auth`, `Ride`, `Pricing`, `Dispatch`, `Realtime`, and `Safety`. 
- **Driver Domain (Phase 7):** `customer/backend/src/modules/dispatch/domain/driver.ts` already defines a rudimentary `Driver` entity and `DriverStatus` (OFFLINE, AVAILABLE, OFFERED, ON_TRIP, SUSPENDED).
- **Dispatch Offer Logic (Phase 7):** Contains `DriverOffer` and `DriverOfferStateMachine`, alongside a `DispatchEngine` and `PartnerDispatchController` (which is a placeholder API for partners).
- **Realtime (Phase 8):** Contains `LocationIngestionService`, WebSocket `RealtimeGateway`, and Redis mocks for processing GPS pings.

## 2. Shared & Reusable Components
- **Realtime / Location Validation:** Phase 8's `LocationSanityPolicy` and `LocationIngestionService` must be reused. The partner app will stream location payloads that conform precisely to these policies.
- **Dispatch Engine:** The authoritative ride assignment (atomic acceptance and offer expiration) remains firmly in Phase 7's core domain.
- **Ride State Machine:** Phase 6's core `RideStateMachine` (`SEARCHING -> DRIVER_ASSIGNED -> DRIVER_EN_ROUTE -> ...`) remains the single source of truth.

## 3. Missing Components (To Be Built in Phase 10)
- **Partner Identity & Onboarding:** The concept of a `Partner` (who can own a driver profile and multiple vehicles) is missing. We need a robust `PartnerStatus` and `OnboardingState` machine (e.g., PROFILE_INCOMPLETE, DOCUMENTS_PENDING, APPROVED).
- **Vehicle Domain:** A structure to manage vehicles (make, model, registration) linked to a Partner.
- **Driver Availability System:** A service to manage a driver's explicit intent to go online or pause, respecting core eligibility rules.
- **Partner BFF (Backend For Frontend):** We need a dedicated API boundary `partner/backend/` to service the Flutter partner app without bloating the customer API.
- **Partner Flutter App:** A brand new Flutter application (`partner/frontend/`) using enterprise architecture (core, features, shared).

## 4. Constraints & Execution Plan
- **ENOSPC (Disk Full):** The environment only has ~50MB of space remaining. As requested, we will structurally build `partner/backend` in TypeScript and `partner/frontend` in Dart, but we will completely bypass `npm install` and `flutter pub get`. 
- **Integration boundaries:** `partner/backend` will be designed conceptually as a module/microservice that interacts with the Core Backend's domains.
