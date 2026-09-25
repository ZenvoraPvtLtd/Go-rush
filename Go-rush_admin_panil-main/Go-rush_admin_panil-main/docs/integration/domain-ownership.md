# Domain Ownership Matrix

The `customer/backend/` directory will be formally designated as the **Core Backend**. It is the single source of truth for the ride-hailing platform.

| Domain                 | Authority                 | Description |
|------------------------|---------------------------|-------------|
| **Authentication**     | Core Backend (Auth Module)| Issues JWTs for Customer, Partner, and Admin. |
| **Customer Profile**   | Core Backend              | Manages customer identity and saved places. |
| **Partner Profile**    | Core Backend (Partner BFF)| Manages partner onboarding and identity. |
| **Driver & Vehicle**   | Core Backend (Dispatch)   | Tracks driver status and approved vehicles. |
| **Pricing & Quote**    | Core Backend (Pricing)    | Generates upfront fares and ride categories. |
| **Ride Lifecycle**     | Core Backend (Ride)       | The canonical state machine for an active trip. |
| **Dispatch & Offers**  | Core Backend (Dispatch)   | Ranks drivers and manages atomic offer acceptance. |
| **Driver Location**    | Core Backend (Realtime)   | Validates and ingests GPS pings into Redis. |
| **Safety / Sharing**   | Core Backend (Safety)     | Generates tokenized viewing sessions. |
| **Admin Operations**   | Core Backend (Admin API)  | Role-Based Access Control for operational viewing. |
