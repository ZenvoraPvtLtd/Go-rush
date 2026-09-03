# Risk Architecture & Domain Ownership

## Ownership Boundary
The Risk Domain owns the `RiskSignal`, `RiskEvaluation`, and `RiskCase` entities. 
It does NOT own the `RideStatus` or `PaymentStatus`. 

A Fraud Evaluation can return a `BLOCK` decision, but the actual enforcement (e.g., rejecting a booking) is executed by the Ride Domain adhering to the Risk Domain's output.

## Canonical Entity
- `id`: UUID 
- `subjectType`: Enum (`CUSTOMER`, `PARTNER`, `DEVICE`, `IP`)
- `subjectId`: String
- `signalType`: Enum (`AUTHENTICATION_ANOMALY`, `PAYMENT_ANOMALY`)
- `severity`: Enum (`LOW`, `MEDIUM`, `HIGH`)
