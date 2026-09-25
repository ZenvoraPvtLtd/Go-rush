# Pricing Integration

## Explicit Flow
Growth MUST NOT write directly to the Payments system.
1. Customer requests a ride.
2. Pricing Engine calculates `BaseFare = 100 INR`.
3. Pricing Engine queries Growth Engine for applied `Coupon: SUMMER50`.
4. Growth Engine responds: `{ eligible: true, discountMinor: 5000 }`.
5. Pricing Engine returns `FinalFare = 50 INR`.

The Client App MUST ONLY read the final quote from the backend. The client cannot manually inject `{ discount: 5000 }` into the ride request.
