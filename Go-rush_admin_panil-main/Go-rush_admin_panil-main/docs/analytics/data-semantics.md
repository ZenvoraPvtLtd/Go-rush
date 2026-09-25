# Data Semantics: Zero vs Unknown

## Rule Definition
Analytics platforms must distinguish between a confirmed zero and missing data.

- **0 (Zero)** = Known Zero. (e.g., A driver completed exactly 0 rides today).
- **NULL / Unknown** = Insufficient Data. (e.g., A driver's completion rate cannot be calculated if they have no dispatch offers).

## Missing Analytics Domains
For domains like Financial Reconciliation, Support, Risk, and Ratings, where the underlying operational system does not store the data (as discovered in the preflight audit):
The KPI value MUST be reported as **DATA NOT AVAILABLE**, not **0**.

Never convert missing data into zero to make dashboards look clean.
