# KPI Dictionary

## Ride Metrics
### Total Rides
- **Business Definition**: Total count of all ride records ever created.
- **Formula**: `COUNT(ride.id)`
- **Data Availability**: DATA AVAILABLE
- **Source**: `Ride` table

### Completed Rides
- **Business Definition**: Count of rides reaching a `COMPLETED` status.
- **Formula**: `COUNT(ride.id) WHERE status = 'COMPLETED'`
- **Data Availability**: DATA AVAILABLE
- **Source**: `Ride` table

### Cancellation Rate
- **Business Definition**: Percentage of requested rides that were cancelled.
- **Formula**: `(Cancelled Rides / Total Rides) * 100`
- **Data Availability**: DATA AVAILABLE
- **Source**: `Ride` table

## Missing KPIs (DATA NOT AVAILABLE)
- **Dispatch Success Rate**: BLOCKED (No dispatch offers table)
- **Gross Booking Value (GBV)**: DATA NOT AVAILABLE (Requires Ledger/Financials, partial data in Ride.fare)
- **Partner Earnings**: BLOCKED (No settlement/earning models)
- **Average Rating**: BLOCKED (No review/rating tables)
