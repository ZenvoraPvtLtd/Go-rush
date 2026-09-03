# Runbook: Database Down

## Symptoms
- HTTP 500 responses across all clients.
- Logs show `PrismaClientInitializationError` or `Timeout`.
- Alerts triggered: `High 5xx Rate`, `Database Unreachable`.

## Immediate Action
1. Verify if the database instance is completely down via Cloud Console.
2. Check if a recent migration or deployment caused a deadlock.
3. Pause dispatch operations and notify users gracefully ("System Maintenance").

## Recovery
- If the instance is out of memory (OOM), vertically scale or reboot.
- If data corruption is detected, initialize a Point-In-Time-Recovery (PITR) to the last known good state.

## Verification
- Run Smoke Tests to confirm ride creation succeeds.
