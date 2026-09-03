# KPI Dictionary & Governance

Every KPI shown in the Admin Dashboard must map to a governed definition here.

## 1. Gross Booking Value (GMV)
- **Definition:** The total value of all completed rides, including taxes and platform fees, before partner payouts.
- **Source Event:** `RideCompleted` (`finalFareMinor`).
- **Owner:** Finance.

## 2. Ride Cancellation Rate
- **Definition:** (Total `RIDE_CANCELLED`) / (Total `RIDE_CREATED`) over a given time window.
- **Source Event:** `RideCreated`, `RideCancelled`.
- **Owner:** Ride Operations.

## 3. Driver Acceptance Rate
- **Definition:** (Total `DRIVER_OFFER_ACCEPTED`) / (Total `DRIVER_OFFER_CREATED`).
- **Source Event:** `DriverOfferCreated`, `DriverOfferAccepted`.
- **Owner:** Dispatch Operations.

*(Note: Live calculations are BLOCKED pending BI Tool configuration).*
