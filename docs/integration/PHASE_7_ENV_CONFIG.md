# Phase 7 Environment Configuration

## Backend (`Go-rush/Backend/.env`)
*These must remain secure and never be exposed to the client or browser.*
```env
PORT=4000
NODE_ENV=production
DATABASE_URL="postgresql://user:password@localhost:5432/gorush?schema=public"
DIRECT_DATABASE_URL="postgresql://user:password@localhost:5432/gorush?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="<generate_secure_secret>"
JWT_REFRESH_SECRET="<generate_secure_refresh_secret>"
GOOGLE_MAPS_SERVER_KEY="<server_restricted_key>"
OTP_PROVIDER="MSG91"
OTP_API_KEY="<otp_api_key>"
OTP_TEMPLATE_ID="<otp_template>"
OTP_SENDER_ID="<otp_sender>"
PAYMENT_PROVIDER="RAZORPAY"
RAZORPAY_KEY_ID="<razorpay_key>"
RAZORPAY_KEY_SECRET="<razorpay_secret>"
RAZORPAY_WEBHOOK_SECRET="<razorpay_webhook_secret>"
FCM_PROJECT_ID="<fcm_project_id>"
FCM_CLIENT_EMAIL="<fcm_email>"
FCM_PRIVATE_KEY="<fcm_private_key>"
STORAGE_ENDPOINT="<s3_endpoint>"
STORAGE_ACCESS_KEY="<s3_access>"
STORAGE_SECRET_KEY="<s3_secret>"
STORAGE_BUCKET="gorush-storage"
SENTRY_DSN="<sentry_dsn>"
CORS_ORIGINS="https://admin.go-rush.example"
```

## Customer App & Driver App (Flutter)
*Passed at build-time using `--dart-define`.*
```bash
flutter build apk \
  --dart-define=API_BASE_URL=https://api.go-rush.example/v1 \
  --dart-define=WS_BASE_URL=wss://api.go-rush.example/v1 \
  --dart-define=GOOGLE_MAPS_ANDROID_API_KEY=<android_restricted_key> \
  --dart-define=GOOGLE_MAPS_IOS_API_KEY=<ios_restricted_key>
```
*Firebase config must be provided via `google-services.json` and `GoogleService-Info.plist`.*

## Admin Panel (Next.js)
*Configured in `.env.production`. Only `NEXT_PUBLIC_` variables are exposed to the browser.*
```env
NEXT_PUBLIC_API_BASE_URL="https://api.go-rush.example/v1"
```
