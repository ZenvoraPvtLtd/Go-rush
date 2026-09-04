# Security Architecture

## Overview
The GoRush platform implements a defense-in-depth strategy based on Google-scale enterprise security standards. 

## Trust Boundaries
1. **Public Edge**: Untrusted client apps (Customer, Partner) and Web UI. Subject to CORS, rate-limiting, and payload validation.
2. **API Gateway (NestJS)**: Enforces Authentication (JWT) and basic request sanitization.
3. **Application Services**: Core business logic implementing RBAC and ownership authorization (IDOR protection).
4. **Data Layer (PostgreSQL/Redis)**: Highly restricted private network. Accessed strictly via Prisma ORM with parameterized queries.

## Core Controls
- **Authentication**: JWT-based stateless auth for clients. Admin endpoints guarded by explicit RBAC roles.
- **Data Protection**: Passwords hashed using bcrypt. Sensitive PII handled with least privilege.
- **In-transit**: All production traffic MUST terminate TLS at the load balancer.
