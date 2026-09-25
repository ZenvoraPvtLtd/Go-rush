# Integration Risk Register

## High Risks
- **Data Fragmentation**: Multiple backends (`Backend/`, `customer/backend/`, `chatbot_driver_backend/`) could lead to multiple sources of truth.
- **Model Inconsistency**: User, ride, and driver models may not align across the different backend implementations.
- **Overwrite Risk**: Importing driver/admin blindly could overwrite or conflict with the canonical structures in `frontend/` and `Backend/`.

## Medium Risks
- **Authentication Fragmentation**: Different apps using different auth strategies (JWT in NestJS, potentially different in Python).
- **Socket/Realtime Divergence**: Dispatch engine relies on realtime updates, multiple socket endpoints will cause dispatch failures.

## Mitigation Strategy
- Enforce `Backend/` as the single Canonical NestJS Backend.
- Audit and map APIs from duplicate backends into `Backend/` controllers/services before deprecating them.
- Port Flutter UI for Driver app to use Canonical Backend APIs.
