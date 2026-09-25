# Growth Architecture & Domain Ownership

## Ownership Boundary
The Growth Domain owns the `Promotion`, `Coupon`, `Campaign`, and `ReferralProgram` entities. 
It does NOT own the `RideStatus` or `Ledger`. 

When a Customer requests a Ride Quote, the Pricing Domain securely queries the Growth Domain (`PromotionEligibilityService`) to calculate the authorized discount. The Customer Client app cannot manually send `{ discount: 50 }`.

## Canonical Entity
- `id`: UUID 
- `promotionType`: Enum (`FIXED_DISCOUNT`, `PERCENTAGE_DISCOUNT`, `FREE_RIDE`, `REFERRAL_REWARD`)
- `status`: Enum (`DRAFT`, `SCHEDULED`, `ACTIVE`, `PAUSED`, `EXPIRED`, `CANCELLED`)
- `eligibilityPolicyId`: UUID
