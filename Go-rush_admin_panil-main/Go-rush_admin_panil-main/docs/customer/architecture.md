# GoRush Customer Platform Architecture

The Customer Platform is decoupled into an independently maintainable and deployable unit:

## High-Level Layout
- **`customer/frontend/`**: The Flutter Mobile Application serving the rider.
- **`customer/backend/`**: A NestJS API gateway/application boundary strictly serving the Customer app.

## Boundaries
1. **Frontend to Backend**: The Flutter application only communicates with `customer/backend/`. It never directly talks to the core `Backend/` or third-party platforms (like payments/maps) without going through its own backend boundary.
2. **Backend to Core**: The Customer Backend will communicate with the core `Backend/` via internal synchronous APIs or asynchronous event buses (e.g. BullMQ / Redis) for shared states like Dispatch matching.
