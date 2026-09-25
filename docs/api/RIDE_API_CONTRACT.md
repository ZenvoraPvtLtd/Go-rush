# Canonical Ride API

- `POST /v1/rides` - Request ride (Customer)
- `GET /v1/rides/:id` - Get details
- `PATCH /v1/rides/:id/cancel` - Cancel ride
- `GET /v1/rides/current` - Active ride

**Rule**: State mutations are backend-authoritative.