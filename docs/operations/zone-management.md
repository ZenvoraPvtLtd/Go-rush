# Operating Zones

## Definition
Geographic bounds representing service areas, distinct pricing zones, or fleet operational areas.

## Architecture
Currently implemented as logical string boundaries (e.g., "Zone North"). Physical PostGIS geometries are deferred until dispatch integration is ready to consume them. 

## Status
`ACTIVE` / `INACTIVE`. When inactive, the zone provides a configuration signal to dispatch to suspend operations.
