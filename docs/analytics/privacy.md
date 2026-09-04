# Data Privacy and PII Governance

## PII Classification
- **CONFIDENTIAL**: `User.email`, `User.phone`, `User.password`, `Driver.email`, `Driver.phone`, `Driver.password`, `Driver.licenseImageUrl`
- **INTERNAL**: `User.id`, `Driver.id`, `Ride.id`
- **RESTRICTED**: GPS Location (`Ride.pickupLat`, `Ride.dropoffLat`, etc.)

## Analytics Handling
- Do not copy raw PII (like plain text phone numbers) into analytics event payloads unless absolutely required and hashed.
- Location data must be restricted to authorized users. Raw GPS history exports require executive approval.
- Anonymization strategy: Replace User/Driver IDs with surrogate keys in the data warehouse (NOT CONFIGURED).
