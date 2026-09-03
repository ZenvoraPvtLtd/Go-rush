# Location Architecture

## Overview
The GoRush Customer app uses a layered location architecture to ensure privacy, battery efficiency, and cross-platform reliability. 

## Component Boundary
- **LocationService**: Abstracts the underlying location retrieval mechanism (`geolocator`). Handles stream management and permission states (`LocationPermissionState`).
- **Foreground Priority**: By default, location is only tracked in the foreground. Background location is deferred until explicitly required by future use cases (like active ride tracking).

## Permission Flow
Location permissions are requested **contextually** rather than on app launch.
- If denied, the user is offered a graceful fallback (manual entry).
- If permanently denied, the user is directed to settings.

## Data Freshness
The `LocationPoint` model includes a `timestamp` and a computed `status` (fresh, stale, unavailable). This ensures the UI never misrepresents a stale coordinate as a live one.
