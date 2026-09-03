# Case State Machine

## Defined Transitions
1. `OPEN` -> `TRIAGED`: Automated or manual categorization.
2. `TRIAGED` -> `ASSIGNED`: Support Agent claims the case.
3. `ASSIGNED` -> `IN_PROGRESS`: Agent begins working.
4. `IN_PROGRESS` -> `WAITING_FOR_CUSTOMER`: Agent requires more info.
5. `IN_PROGRESS` -> `RESOLVED`: Agent provides a resolution.
6. `RESOLVED` -> `CLOSED`: Final immutable state (subject to Reopening window).
