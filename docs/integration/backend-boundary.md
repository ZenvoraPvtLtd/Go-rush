# Backend Boundaries

## The Core Backend
The existing `customer/backend/` directory actually contains the **Core Backend** of the GoRush platform. Despite its name, it houses the canonical logic for:
- `RideStateMachine`
- `DispatchEngine`
- `LocationIngestionService`
- `PricingEngine`

## Integration Strategy
To maintain a single authoritative ride engine while preventing the `customer/backend` from bloating with Partner-specific API shapes:

1. **Rename / Adopt:** `customer/backend/` is treated conceptually as the `Core Backend`.
2. **Partner API Boundary:** We will create `partner/backend/` as a lightweight BFF (Backend-For-Frontend) that defines the routes required by the Partner App (e.g., `POST /offers/:offerId/accept`) but strictly proxies to or imports from the Core Backend's domains.
3. **Legacy `Backend/`:** The `Backend/` directory at the root is considered deprecated/legacy and must not be used to process active rides to avoid split-brain scenarios.
