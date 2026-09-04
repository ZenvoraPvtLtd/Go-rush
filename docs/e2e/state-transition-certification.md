# State Transition Certification

## Ride State Machine (`RideStatus`)

| Current State | Requested Transition | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| `PENDING` | `DRIVER_ACCEPTED` | Transition to `ACCEPTED` | PASS |
| `ACCEPTED` | `ARRIVED` | Transition to `ARRIVED` | PASS |
| `ARRIVED` | `IN_PROGRESS` | Transition to `IN_PROGRESS` | PASS |
| `IN_PROGRESS` | `COMPLETED` | Transition to `COMPLETED`, trigger payment | PASS |
| `PENDING` | `COMPLETED` | Invalid Transition (Error) | PASS |
| `COMPLETED` | `CANCELED` | Invalid Transition (Error) | PASS |
| `CANCELED` | `ACCEPTED` | Invalid Transition (Error) | PASS |

## Payment State Machine (`PaymentStatus`)

| Current State | Requested Transition | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| `PENDING` | `AUTHORIZED` | Transition to `AUTHORIZED` | PASS |
| `AUTHORIZED` | `CAPTURED` | Transition to `CAPTURED`, update Ledger | PASS |
| `PENDING` | `FAILED` | Transition to `FAILED`, emit notification | PASS |
| `CAPTURED` | `AUTHORIZED` | Invalid Transition (Error) | PASS |
