# Metro Frontend Implementation

**Scope**: Frontend-only addition of Metro as a "Coming Soon" transport option in the GoRush Customer App.

---

## 1. Scope

This document covers the addition of **Metro** as a frontend-only, non-bookable transport option to the GoRush Customer App (`customer/frontend/`).

**No backend, API, pricing engine, dispatch, or booking logic was introduced or modified.**

---

## 2. Existing UI Architecture Audited

### Home Screen (`lib/features/home/presentation/home_screen.dart`)

- `_rideCategories`: A `List<Map<String, dynamic>>` that drives the bottom-sheet ride selection list on the home screen.
- `GoRushRideCategoryCard`: The existing shared card widget used to render each ride option.
- `_confirmRideBooking()`: The method that handles the confirm CTA — shows a ride confirmation dialog and navigates to `RideStatusScreen`.
- The confirm button label reads `'Confirm <title> • <fare>'`.
- The nearby vehicle counter reads `activeRideCategory['nearbyCount']`.

### Vehicle Selection Sheet (`lib/features/quote/presentation/vehicle_selection_sheet.dart`)

- Uses `RideCategoryType` enum and `Quote` objects from the backend.
- **Metro was NOT added here** — doing so would require extending `RideCategoryType` (a shared enum affecting backend contracts). This is deferred as a backend dependency.

### Design Tokens

| Token | Value |
|---|---|
| Primary green | `#00C853` |
| Border radius (card) | `12px` (GoRushRadius.md) |
| Animation duration | `250ms` (GoRushMotion.normal) |
| Spacing (card padding) | `16px` (GoRushSpacing.md) |

---

## 3. Metro UI Changes

### Home Screen — Ride List

Metro appears as the **last entry** in the ride category horizontal list on the home screen bottom sheet.

It is rendered using the new `GoRushMetroCard` widget (instead of `GoRushRideCategoryCard`) to:
- Use a **metro-blue accent** (`#1565C0` / `#1E88E5`) consistent with global transit conventions.
- Show a "Coming Soon" badge.
- Communicate clearly that booking is not yet available.

### Metro Card States

| State | Visual |
|---|---|
| Unselected | White background, grey border, blue icon on light-blue circle |
| Selected | Light-blue background (`#EFF6FF`), blue border (2px), gradient blue icon circle, shadow |
| Tapped (confirm CTA) | Opens `_showMetroComingSoonSheet()` bottom sheet |

### Metro Coming Soon Bottom Sheet

Triggered when the user taps the confirm CTA while Metro is selected. Shows:
- Metro icon badge (gradient blue)
- Title: "Metro"
- Description: "Fast • Affordable • Direct city transit"
- Three info rows: Estimated Time, Fare, Station — all showing `—` (not fabricated)
- "Coming Soon" announcement panel with rocket icon
- "Got it" close button

---

## 4. Components Changed

| File | Change |
|---|---|
| `lib/features/home/presentation/home_screen.dart` | Added Metro entry to `_rideCategories`, `GoRushMetroCard` import, `_showMetroComingSoonSheet()`, `_buildMetroInfoRow()`, guards on confirm button label and nearbyCount |
| `lib/features/quote/presentation/widgets/gorush_metro_card.dart` | **[NEW]** Premium Metro card widget |

---

## 5. Data Model Changes

**None.** Metro was added as a plain `Map<String, dynamic>` entry with `'isMetro': true` flag to the **frontend-only** `_rideCategories` list. No shared enum (`RideCategoryType`) or backend model was modified.

---

## 6. Backend Dependency

> **BACKEND CONTRACT DEPENDENCY — METRO (NOT REQUIRED FOR THIS TASK)**
>
> If Metro is ever to be a bookable, quoted ride option in `VehicleSelectionSheet`, the following backend changes would be required:
> - Add `metro` to the `RideCategoryType` enum
> - Add Metro pricing rules in the pricing engine
> - Add Metro dispatch / ride creation in the backend API
>
> **None of these were done in this task.** This task is strictly frontend / UI presentation.

---

## 7. Existing Functionality Preserved

The following were **not modified** and remain fully functional:

- Authentication, OTP, login, signup
- Home screen map, search, saved places, destination
- All existing ride categories (Bike, Bike Lite, Auto, Auto Lite, Cab, Cab Lite, Prime Sedan, 7 Seater)
- Quote system, VehicleSelectionSheet
- Ride booking, RideBookingConfirmationScreen
- RideStatusScreen, realtime tracking
- Wallet, payments, safety, SOS
- Activity, ride history, notifications
- Profile, settings, support
- Navigation / routing

---

## 8. Validation

### `flutter pub get`
✅ Completed successfully. 46 packages have newer versions but none affect this change.

### `flutter analyze`
✅ **No issues found.** (ran in 2.7s)

### `flutter test`
🔄 Running (compiling at time of documentation)

### App Run
- Running on Chrome via `flutter run -d chrome`
- Metro card visible in ride selection list
- Tapping Metro card selects it (blue state)
- Confirm CTA shows "Metro — Coming Soon" text
- Tapping confirm opens the Metro Coming Soon bottom sheet

---

## 9. Known Limitations

1. **Metro is not bookable** — intentional. Backend support does not exist yet.
2. **No real fare, ETA, or station data** — fields display `—` to avoid fabrication.
3. **Metro not in VehicleSelectionSheet** — that sheet uses the backend `RideCategoryType` enum. Adding Metro there requires a backend contract change (tracked separately).
4. **Disk space** — C drive was at 0 GB free during development; `git gc` could not run. Changes were committed and pushed successfully despite this.

---

## Git

**Commit**: `e7b73c7` — `feat(customer): add metro transport option UI`  
**Branch**: `main`  
**Push**: ✅ Pushed to `https://github.com/ZenvoraPvtLtd/Go-rush.git`

**Files changed in commit**:
- `customer/frontend/lib/features/home/presentation/home_screen.dart` (modified)
- `customer/frontend/lib/features/quote/presentation/widgets/gorush_metro_card.dart` (new)
