# Production Payment Architecture

## Overview
This document outlines the secure, backend-authoritative payment flow for the GoRush system. The payment lifecycle is entirely abstracted from the frontend to prevent fraud.

## Core Security Tenets
1. **Zero Trust Client**: The Flutter app's payment success callback is strictly ignored. Only verified backend webhooks can finalize a payment.
2. **Backend Amount Authority**: The client cannot provide the payment amount. The canonical backend calculates all fares and quotes.
3. **Idempotency**: All payment initiations require an `Idempotency-Key` header to prevent duplicate charges on network retries.

## Architecture Flow
1. **Order Creation**: Client calls `POST /api/v1/payments/initiate` passing `ride_id`.
2. **Provider Integration**: Backend fetches canonical ride fare, calls the payment provider API, and receives a `provider_order_id`.
3. **Client Handoff**: Backend returns `provider_order_id` to client. Client launches provider UI.
4. **Processing**: Provider processes user payment.
5. **Webhook**: Provider sends a cryptographically signed webhook to `POST /api/v1/payments/webhook`.
6. **Verification**: Backend validates webhook signature.
7. **Finalization**: Backend records successful Ledger transaction, distributes driver earnings, and emits WS event `payment.updated`.

## Wallet and Earnings
- **Wallet Top-up**: Analogous to ride payments, but credits the user's ledger balance.
- **Driver Earnings**: Automatically credited to driver's ledger on ride completion.
- **Platform Commission**: Deducted mathematically via ledger split during payment finalization.
