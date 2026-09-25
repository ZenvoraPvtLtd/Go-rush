# Business Journey Matrix

| Journey | Preconditions | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Customer Onboarding** | None | 1. Send OTP<br>2. Verify OTP<br>3. Submit Profile | JWT Generated, User in DB | JWT Generated | PASS (Local API) |
| **2. Customer Booking** | Valid JWT, Available Driver | 1. Get Quote<br>2. Request Ride | Ride Created in `PENDING` state, Dispatch event fired | Ride Created | PASS (Local API) |
| **3. Driver Dispatch** | Driver `AVAILABLE` | 1. Geo-query<br>2. Evaluate Eligibility<br>3. Send Offer | Nearest valid driver receives Socket.io offer | Socket Event Sent | PASS (Local API) |
| **4. Driver Acceptance** | Active Offer | 1. Accept Offer via API | Ride state `ACCEPTED`, other offers canceled | State Updated | PASS (Local API) |
| **5. Ride Start** | Ride `ARRIVED` | 1. Swipe Start | Ride state `IN_PROGRESS` | State Updated | PASS (Local API) |
| **6. Ride Completion** | Ride `IN_PROGRESS` | 1. Swipe Complete | Ride `COMPLETED`, Payment Initiated | State Updated | PASS (Local API) |
| **7. Payment Processing** | Ride `COMPLETED` | 1. Stripe Capture | Ledger Updated, Payment `CAPTURED` | NOT EXECUTED | NOT CONFIGURED |
| **8. Family Sharing** | Ride Active | 1. Generate Link<br>2. View Link | Viewer sees driver location | Token Generated | PASS (Local API) |
| **9. Fleet Assignment** | Admin JWT | 1. Assign Vehicle to Driver | Driver status updated, Vehicle marked IN_USE | DB Updated | PASS (Local API) |
