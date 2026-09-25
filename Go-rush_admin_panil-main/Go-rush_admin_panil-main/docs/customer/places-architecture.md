# Places & Geocoding Architecture

## Overview
The Places and Geocoding modules enable destination search, address resolution, and ETA estimations.

## Provider Abstractions
- **PlacesProvider**: Handles autocomplete and place detail retrieval.
- **GeocodingProvider**: Translates between coordinates and addresses.
- **RoutingProvider**: Handles pathfinding, distances, and durations between two coordinates.

## Search Debouncing
The Flutter app uses `rxdart`'s `BehaviorSubject` to debounce autocomplete queries (e.g., 400ms delay). This prevents API flooding on rapid typing, protecting rate limits and minimizing cost. Stale responses are naturally ignored by keeping the stream distinct.

## Backend Places Module
The NestJS backend acts as a secure proxy (`GET /v1/places/autocomplete`). This hides API credentials from the client, normalizes responses to the GoRush Domain model, and enables server-side caching and rate-limiting.
