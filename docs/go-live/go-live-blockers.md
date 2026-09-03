## P0 — Critical Blockers
1. **Missing Staging Infrastructure:** The underlying PostgreSQL database, Redis cluster, and API Servers have not been deployed to AWS/GCP. Cloud Provider Authorization is strictly REQUIRED.
2. **Dynamic E2E Tests Failed/Blocked:** Because there is no infrastructure, we cannot certify the Ride Concurrency transaction safety or Location Realtime ingestion.
3. **Load Testing Blocked:** Because there is no Staging capacity, dynamic load-testing (`k6`) to certify enterprise concurrency is blocked.
4. **Payment Gateway Blocked:** No Payment Provider (Stripe/Razorpay) has been officially authorized or configured. Financial validations are BLOCKED.
5. **Partner Payout Blocked:** Commission rates, Payout Gateways, and Minimum Settlement policies are completely undefined. Partner payouts are BLOCKED.
6. **Service Quality Rules Undefined:** The Rating Scale, Quality Enforcement Thresholds, and Review Moderation logic are pending Business Decisions. Quality operations are BLOCKED.
7. **Notification Providers Blocked:** External providers for Push, SMS, and Email are not authorized or configured. Live notifications are BLOCKED.
8. **Operational Support Policies Undefined:** SLAs, Refund logic, Partner Penalties, and Case Categories are pending Business Decisions. Support Enforcement is BLOCKED.
9. **Fraud & Risk Intelligence Blocked:** No ML Provider, IP Intelligence, or Auto-Enforcement Rules have been authorized. Live Fraud Blocking is BLOCKED.
10. **KYC & Partner Compliance Blocked:** No Cloud Storage, KYC Provider, or Legal Document Requirements have been configured. Live Partner Onboarding is BLOCKED.
11. **Growth & Promotions Blocked:** Coupon models, Campaign Budgets, and Referral payout amounts are undefined. Live marketing discounts and incentive ledger injections are BLOCKED.

## P1 — Major Blockers
1. **Missing Secrets Management:** Vault / AWS Secrets Manager has not been configured.

*The system is strictly blocked from Go-Live.*
