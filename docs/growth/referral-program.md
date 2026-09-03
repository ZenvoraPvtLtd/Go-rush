# Referral & Reward Program

## Abuse Protection Boundary
Referral Programs are highly susceptible to fraud (e.g., users creating fake accounts to earn Referral Credits).

### Integration with Phase 23 (Risk)
Before issuing a `ReferralReward`, the system must query the Risk Engine. If `Device_Fingerprint` matches or `IP_Velocity` is high, the Referral is flagged as `ABUSE_SUSPECTED` and the reward is NOT issued to the Ledger.

### Reward Status Lifecycle
- `PENDING` -> `ELIGIBLE` -> `ISSUED` (Ledger credited) -> `REVERSED` (Fraud detected post-issue).
