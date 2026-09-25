# Geospatial Security & Privacy

## Core Principles
1. **Purpose Limitation**: Location data is collected only when there is an explicit product need (e.g., setting a pickup point, finding nearby drivers).
2. **Minimal Retention**: Precise coordinates are stored temporarily. Historical ride logs use generalized or masked coordinates where full precision isn't legally required.
3. **No Unnecessary Logging**: Logs must not contain plain-text latitude/longitude pairs of customers unless aggressively redacted.

## Error Handling
Geospatial APIs return typed domain errors (`GEO_RATE_LIMITED`, `PLACE_NOT_FOUND`) rather than leaking underlying provider stack traces.
