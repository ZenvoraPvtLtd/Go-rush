# Rating Architecture

## Core Entity: Rating
- `id`: UUID (Immutable)
- `rideId`: UUID (Must exist and be `RIDE_COMPLETED`)
- `raterId`: UUID (Customer or Partner)
- `ratedId`: UUID (Customer or Partner)
- `score`: Integer
- `reviewReference`: UUID (Optional)
- `status`: Enum (`VISIBLE`, `HIDDEN`)
