# API Migration Matrix

## Overview
This matrix maps the existing duplicate APIs to the newly defined Canonical Backend endpoints.

| Domain | Current Source | Existing Endpoint | Canonical Target | Status |
|--------|----------------|-------------------|------------------|--------|
| Auth | `customer/backend` | `/auth/login` | `/api/v1/auth/login` | PENDING |
| Auth | `chatbot_driver` | `/api/token` | `/api/v1/auth/login` | PENDING |
| Rides | `customer/backend` | `/rides/create` | `/api/v1/rides` | PENDING |
| Location | `chatbot_driver` | `/api/location` | `/api/v1/drivers/location` | PENDING |
| Admin | `Go-rush_admin` | `/admin/users` | `/api/v1/admin/users` | PENDING |

## Migration Strategy
1. **Adapters**: Update the Flutter apps (`customer/frontend` and `driver_flutter`) API clients (e.g., Dio/Http instances) to point to the canonical URL structure.
2. **Payload Mapping**: If the existing frontend sends different JSON keys, modify the canonical backend controllers to accept these variations temporarily or update the frontend models.
3. **Deprecation**: Once the flutter apps are fully pointing to the Canonical backend, the `customer/backend` and `chatbot_driver_backend` will be removed.
