# Maps Architecture

## Abstraction Strategy
The Customer app strictly separates business logic from map rendering via the `MapsProvider` interface.

## Implementations
- **GoogleMapsProviderImpl**: The primary implementation using `google_maps_flutter`. Manages the internal `GoogleMapController`, rendering markers, polylines, and executing camera animations.
- **MockMapsProvider**: Used for testing and environments where map rendering is impossible.

## Security & API Keys
API keys are never hardcoded. They are injected via environment configurations per platform (Android `AndroidManifest.xml`, iOS `AppDelegate.swift`). 
