# Customer Backend Architecture

The backend operates strictly as an API Gateway/BFF (Backend for Frontend) tailored to the Customer App needs.

## Framework
- Node.js + NestJS + TypeScript.

## Layers
1. **Controllers (Presentation)**: HTTP request parsing, input validation (DTOs). Should be very thin.
2. **Services (Application)**: Feature-specific business logic.
3. **Domain Models**: Types representing core business logic.
4. **Infrastructure**: Integrations with Redis, PostgreSQL (via internal APIs), Maps services, etc.

## Error System
- Standardized typed error response formats (e.g., `{ code: "AUTH_001", message: "Invalid credentials" }`).
- Prevents leaking stack traces or internal failures.
