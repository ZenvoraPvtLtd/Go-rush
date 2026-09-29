# Phase 6 - Production External Services Integration Report

## 1. Google Maps Platform
- **Provider**: Google Maps Platform
- **Purpose**: Geolocation, Autocomplete, Maps Rendering, Routes (Customer/Driver/Backend)
- **Required**: Yes
- **Free tier**: Yes ($200 monthly credit)
- **Paid usage**: Yes (High volume calls)
- **Credential**: `GOOGLE_MAPS_ANDROID_API_KEY`, `GOOGLE_MAPS_IOS_API_KEY` (Mobile restricted), `GOOGLE_MAPS_SERVER_KEY`
- **Where stored**: Client App configs / Backend `.env`
- **Configured**: Yes
- **Tested**: PARTIAL
- **Remaining blocker**: Requires actual billing-enabled API keys injection on deployment.

## 2. OTP Provider (Twilio/MessageBird)
- **Provider**: Standard SMS Aggregator
- **Purpose**: Registration, Login, Trip Start 2FA
- **Required**: Yes
- **Free tier**: Limited Trial
- **Paid usage**: Yes (Per message)
- **Credential**: `OTP_API_KEY`, `OTP_TEMPLATE_ID`, `OTP_SENDER_ID`
- **Where stored**: Backend `.env` (Never exposed to client)
- **Configured**: Yes
- **Tested**: PASS
- **Remaining blocker**: None

## 3. Firebase Cloud Messaging (FCM)
- **Provider**: Google Firebase
- **Purpose**: Push Notifications for Dispatch, Offers, Ride Updates
- **Required**: Yes
- **Free tier**: Yes (Free tier covers massive usage)
- **Paid usage**: Rarely triggered unless scaling enormously
- **Credential**: `FCM_PRIVATE_KEY`
- **Where stored**: Backend `.env` (Server Account)
- **Configured**: Yes
- **Tested**: PARTIAL
- **Remaining blocker**: Requires APNs linking for iOS delivery and Android `google-services.json` injection.

## 4. Payment Gateway (Razorpay/Stripe)
- **Provider**: Razorpay
- **Purpose**: Wallet Top-up, Ride Payment, Driver Payouts
- **Required**: Yes
- **Free tier**: N/A (Percentage based)
- **Paid usage**: Transaction fees apply
- **Credential**: `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- **Where stored**: Backend `.env`
- **Configured**: Yes
- **Tested**: PARTIAL
- **Remaining blocker**: Needs authoritative Webhook listener tests in production to ensure state machine transitions operate cleanly.

## 5. Object Storage (S3 / Cloud Storage)
- **Provider**: AWS S3 / Google Cloud Storage
- **Purpose**: KYC Documents, Profile Images, Receipts
- **Required**: Yes
- **Free tier**: 5GB standard limits
- **Paid usage**: Volume based
- **Credential**: `STORAGE_SECRET`
- **Where stored**: Backend `.env`
- **Configured**: Yes
- **Tested**: PARTIAL
- **Remaining blocker**: Requires CORS provisioning on the bucket and IAM policy configuration for the canonical backend role.
