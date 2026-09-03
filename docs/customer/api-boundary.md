# API Boundary

The Customer App and Backend communicate over an explicit API contract.

## Contract Design
- Versioned endpoints prefixed with `/v1/`.
- Predictable status codes (2xx, 4xx, 5xx).
- Use `RequestId` and `CorrelationId` headers for observability.

## Authentication
- Handled via `AuthInterceptor` on the client and Guards on the NestJS backend.
- Token refresh flows and device session management must be robust.
