# API Migration Matrix

| CLIENT | CURRENT API | CURRENT BACKEND | CANONICAL API | ACTION | RISK |
|---|---|---|---|---|---|
| Customer | `/auth/login` | `customer/backend` | `/v1/auth/customer/login` | MIGRATE | Low |
| Driver | `/api/login` | `Go-rush-driver-app-main/backend` | `/v1/auth/driver/login` | MIGRATE | Med |
| Admin | N/A (Mock) | N/A | `/v1/admin/*` | MIGRATE | Low |