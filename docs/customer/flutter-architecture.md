# Flutter Architecture

We enforce a Clean Architecture feature-first layout.

## Layer Rules
1. **Presentation**: UI components (Widgets), screen state, Riverpod UI controllers. Cannot access data/infrastructure directly.
2. **Application/Domain**: State models, Riverpod Providers for business logic, Repositories (Interfaces/Abstract classes).
3. **Data**: Concrete Repositories mapping API responses to Domain models.
4. **Infrastructure**: HTTP Clients, secure storage, Maps SDK, Location tracking SDKs.

## State Management
- **Riverpod** is the strict choice for state management. No Bloc, GetX, or Provider.
- Only domain concepts should be modeled in the state.

## Design System
- Centrally located in `lib/shared/`.
- Uses `GoRushColors`, `GoRushTypography`, `GoRushSpacing`, etc.
- No direct hardcoded magic numbers for sizing or colors in UI widgets.
