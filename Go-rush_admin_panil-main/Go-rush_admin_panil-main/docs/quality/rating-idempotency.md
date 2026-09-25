# Rating Idempotency & Aggregation

## Duplicate Prevention
The database enforces a `UNIQUE(raterId, rideId)` constraint. A Customer CANNOT rate the same Driver twice for the same logical Ride. Duplicate requests from a poor network connection will idempotently return `200 OK` but yield only one logical rating row.

## Aggregation Integrity
`averageRating` and `ratingCount` on the Partner Profile are cached projections. The canonical source of truth remains the individual `Rating` rows. 
*Note: We do not fabricate floating-point ratings (e.g. 4.9). If there are no ratings, the system returns `N/A`.*
