# Phase 0: Integration Risk Register

## High Risks
1. **Divergent Data Models**: The Driver Flutter App may expect a different API contract than what the Core Backend provides.
   - *Mitigation*: Phase 2 will establish a Canonical API Contract. We will write adapters or update the Core Backend to satisfy required client fields without breaking the schema.
2. **Realtime Disconnects**: Relying on WebSockets for ride status can lead to lost updates.
   - *Mitigation*: Implement robust reconnection logic, token refresh, and HTTP fallback/sync for ride states in Phase 4 & 5.
3. **Duplicate State Mutations**: Clients directly modifying ride status or wallet balance.
   - *Mitigation*: All mutations must be backend-authoritative. Clients can only request transitions.

## Medium Risks
1. **Authentication Silos**: Each imported app might have its own auth logic (Firebase vs JWT vs Custom).
   - *Mitigation*: Unify all auth under Core Backend using standard JWT + Refresh Tokens.
2. **Hardcoded Mock Data**: Next.js Admin and Flutter apps contain hardcoded UI states.
   - *Mitigation*: Systematically hunt down and replace all mocks with actual API calls to Core Backend.
