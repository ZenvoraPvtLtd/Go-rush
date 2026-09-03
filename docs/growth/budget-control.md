# Campaign Budget Control

## Safe Consumption
Every active Campaign must be linked to a `PromotionBudgetPolicy`.

```typescript
interface PromotionBudgetPolicy {
    budgetLimitMinor: number;
    currency: string;
    consumedMinor: number;
}
```

### Concurrency
To prevent two simultaneous ride requests from exceeding the exact budget limit, the database must execute a transactional lock (or atomic increment) `UPDATE budget SET consumed = consumed + X WHERE consumed + X <= limit`. If it fails, the Coupon returns `BUDGET_EXHAUSTED`.
