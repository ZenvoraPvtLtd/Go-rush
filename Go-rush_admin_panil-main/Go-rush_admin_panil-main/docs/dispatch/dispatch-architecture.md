# Dispatch Architecture

## Overview
The Phase 7 Dispatch Engine implements a strict backend-authoritative architecture to discover, filter, rank, and assign drivers to rides.

## Core Components
1. **DriverDomain:** Defines `Driver`, `DriverStatus`, and `DriverLocation`.
2. **Eligibility & Ranking:** `DriverEligibilityPolicy` filters out stale locations, offline drivers, and mismatched vehicle categories. `DriverRankingPolicy` sorts candidates by distance/fairness.
3. **DispatchEngine:** An asynchronous service that discovers candidates via `DriverLocationProvider`, creates a `DriverOffer`, and manages its lifecycle.
4. **Offer State Machine:** Validates transitions (`PENDING -> ACCEPTED / REJECTED / EXPIRED`).
5. **Partner API:** Provides the endpoints for the future Partner App to accept or reject offers.

## Concurrency and Integrity
- **Atomic Assignment:** When a driver accepts an offer, the system validates the offer is still `PENDING` and not `EXPIRED`. It then attempts to atomically mutate the Ride state. If the customer has cancelled the ride (it is no longer `SEARCHING`), the acceptance safely fails.
