# Promotion & Coupon Model

## Coupon Abstraction
To safely handle Promo Codes, codes must be securely generated and strictly bound to Budgets.

```typescript
interface Coupon {
    id: string;
    promotionId: string;
    code: string; // e.g. "SUMMER50"
    status: CouponStatus; // ACTIVE, EXHAUSTED, EXPIRED
    maxRedemptions: number;
    perCustomerLimit: number;
}
```

## Redemption Idempotency
To prevent a single user from redeeming a coupon twice via double-tapping:
`CouponRedemption` requires a `UNIQUE(customerId, couponId, rideId)` constraint. It also accepts an `Idempotency-Key` from the client request.
