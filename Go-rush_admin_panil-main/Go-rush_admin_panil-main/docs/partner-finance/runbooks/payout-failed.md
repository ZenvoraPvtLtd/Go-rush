# Runbook: Payout Failure

## Condition
A Partner Payout is marked `FAILED` by the Gateway Webhook.

## Recovery
1. **Halt Automatic Retries:** Do not blindly loop the payout request. 
2. **Revert Settlement State:** The associated `SettlementBatch` should be marked `FAILED`, returning the underlying `Earnings` to an `ELIGIBLE` status for the next batch cycle.
3. **Notify:** Do not alert the Partner via push until manual Admin reconciliation confirms the funds did not leave the master platform account.
