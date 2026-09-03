# Fare Breakdown Structure

## The Structure
Instead of passing a monolithic total fare string, the backend returns a structured `FareBreakdown` object:
```json
{
  "subtotal": { "amountMinor": 8500, "currency": "INR" },
  "components": [
    { "type": "BASE_FARE", "label": "Base Fare", "amount": { "amountMinor": 3000, "currency": "INR" } },
    { "type": "DISTANCE_FARE", "label": "Distance Fare", "amount": { "amountMinor": 5000, "currency": "INR" } },
    { "type": "BOOKING_FEE", "label": "Booking Fee", "amount": { "amountMinor": 500, "currency": "INR" } }
  ],
  "discount": { "amountMinor": 0, "currency": "INR" },
  "tax": { "amountMinor": 425, "currency": "INR" },
  "total": { "amountMinor": 8925, "currency": "INR" }
}
```

## Benefits
1. **Dynamic Rendering**: The UI iterates over `components` to render receipt rows. If a new rule (e.g., `TOLL_FEE`) is added backend-side, the client seamlessly renders it without app updates.
2. **Auditability**: It guarantees transparency for both the customer (in UI) and for customer support (in admin tools).
