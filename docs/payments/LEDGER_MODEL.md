# Ledger Model

## Overview
The ledger system implements immutable, append-only double-entry bookkeeping to track all financial transactions. This guarantees reconciliation and auditability.

## Principles
- **Immutability**: Once a ledger entry is written, it cannot be updated or deleted. Corrections are made via reversing entries.
- **Double Entry**: Every movement of funds involves a credit and a corresponding debit.

## Schema Definition
```sql
CREATE TABLE ledger_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id VARCHAR NOT NULL, -- Ride ID or Order ID
    provider_reference VARCHAR UNIQUE, -- Stripe/Razorpay txn ID
    user_id UUID,
    driver_id UUID,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    type VARCHAR(50) NOT NULL, -- RIDE_PAYMENT, TOP_UP, EARNING, COMMISSION, REFUND
    status VARCHAR(20) NOT NULL, -- PENDING, COMPLETED, FAILED, REVERSED
    created_at TIMESTAMP DEFAULT NOW(),
    audit_metadata JSONB -- IP, UserAgent, Webhook ID
);
```

## Transaction Flow (Successful Ride)
When a ride of $20.00 is paid successfully:
1. Entry A: Debit User Wallet/Card ($20.00)
2. Entry B: Credit Driver Wallet ($16.00) - Assuming 20% commission
3. Entry C: Credit Platform Revenue ($4.00)

All three entries share the same `reference_id` to allow strict reconciliation.
