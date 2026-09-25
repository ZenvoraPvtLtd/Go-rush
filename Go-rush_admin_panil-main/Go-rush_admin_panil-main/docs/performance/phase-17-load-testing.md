# Safe Load Testing Policy

**Status:** BLOCKED — STAGING INFRASTRUCTURE NOT PROVISIONED.

## Load Test Guidelines (For future execution)
1. **Target:** Only the explicit Staging Environment URL is permitted. **ABSOLUTELY NO production load testing.**
2. **Tooling:** Approved project tooling (e.g. `k6` or `Artillery`).
3. **Data:** Strictly Synthetic data. Do not use real phone numbers or PII.
4. **Limits:** Ensure the load test contains a hard stop condition (e.g., duration limit, virtual user limit).
5. **External APIs:** External Map and Messaging APIs MUST be mocked during load tests to prevent excessive billing and 3rd-party rate limits.
