# GoRush Ride-Hailing Enterprise Platform 🚗💨

A unified, multi-platform ride-hailing and delivery ecosystem consisting of an enterprise NestJS backend, real-time dispatch engine, customer mobile and web applications, driver partner mobile application, and administrative control center.

---

## 🏛️ Repository Architecture & Layout

```text
repository-root/
├── .github/                       # GitHub Actions workflows and CI automation
├── Backend/                       # Production NestJS backend (Auth, Dispatch, Rides, Pricing, Prisma)
├── customer/
│   ├── backend/                   # Customer-facing backend API services
│   ├── frontend/                  # Customer Flutter mobile application (iOS & Android)
│   └── README.md                  # Customer platform documentation
├── driver/                        # Driver Partner Flutter application (Application ID: com.gorush.driver.gorush_driver)
│   ├── android/                   # Android build configuration & native plugins
│   ├── ios/                       # iOS workspace & Podfile
│   ├── lib/                       # 30+ driver screens, state management, Razorpay & Firebase services
│   ├── test/                      # Unit, widget, and integration test suites
│   ├── pubspec.yaml               # Flutter package configuration
│   └── README.md                  # Driver setup, build, and release documentation
├── frontend/                      # Customer Web Application (Next.js, React, TailwindCSS)
├── Go-rush_admin_panil-main/      # Administrative operations dashboard
├── docs/                          # Architecture specifications and integration guides
├── .gitignore                     # Repository-level ignore rules for security and build artifacts
└── README.md                      # Platform overview and getting started guide
```

---

## ⚡ Prerequisites & Supported Versions

| Technology | Minimum Version | Recommended Version |
| :--- | :--- | :--- |
| **Flutter SDK** | `>= 3.24.0` | `3.27.x` or latest stable |
| **Dart SDK** | `>= 3.5.0` | `3.5.x` |
| **Node.js** | `>= 20.x` | `v22.x` or `v24.x` |
| **npm** | `>= 9.x` | `>= 10.x` |
| **Java JDK** | OpenJDK 17 | OpenJDK 17 |
| **Android SDK** | `minSdk = 21` | `targetSdk = 34`, `compileSdk = 36` |
| **PostgreSQL** | `>= 14.0` | `16.x` (with PostGIS extension) |
| **Redis** | `>= 6.0` | `7.x` (for BullMQ queue & presence caching) |

---

## 🚀 Installation & Getting Started

### 1. Backend Service (`Backend/`)
The primary backend is built on **NestJS**, **Prisma ORM**, **BullMQ**, and **Socket.IO**.

```bash
cd Backend

# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL DATABASE_URL and Redis host

# 4. Run database migrations
npx prisma migrate deploy

# 5. Start development server
npm run start:dev
```

### 2. Driver Partner Application (`driver/`)
The driver partner mobile app is located directly under `driver/` at the repository root.

```bash
cd driver

# 1. Fetch dependencies
flutter pub get

# 2. Run static analysis
flutter analyze

# 3. Run test suite
flutter test

# 4. Launch on connected device or emulator
flutter run
```

### 3. Customer Application (`customer/frontend/`)
The customer mobile app is located under `customer/frontend/`.

```bash
cd customer/frontend

# 1. Fetch dependencies
flutter pub get

# 2. Run static analysis
flutter analyze

# 3. Run test suite
flutter test

# 4. Launch application
flutter run
```

---

## 🌐 Networking & Local API Configuration

When developing locally on Android Emulators or physical devices, `localhost` refers to the device itself. Use the correct base URLs:

| Environment | Base URL | Notes |
| :--- | :--- | :--- |
| **Android Emulator** | `http://10.0.2.2:4000` | Points to host machine's `localhost:4000` |
| **iOS Simulator** | `http://localhost:4000` | Shares localhost with host machine |
| **Physical Device (LAN)** | `http://192.168.1.X:4000` | Machine must be on the same Wi-Fi network |
| **Cloud / Production** | `https://api.gorush.com` | Requires valid HTTPS SSL certificate |

### Runtime Dart-Define Flags:
Both Flutter apps support runtime configuration overrides:

```bash
# Driver App
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:5000

# Customer App
flutter run --dart-define=API_URL=http://10.0.2.2:3001
```

---

## 🧪 Comprehensive Verification & Testing

### Backend Unit & Integration Tests
```bash
cd Backend
npm test
npm run build
```
- **Unit Tests**: 10 tests across AuthGuard, Pricing, Rides, and App controller (`vitest run`).
- **Prisma Integration Tests**: Automatically executed when `DATABASE_URL` is configured in `.env`.

### Customer Flutter App Verification
```bash
cd customer/frontend
flutter pub get
flutter analyze
flutter test
```

### Driver Flutter App Verification
```bash
cd driver
flutter pub get
flutter analyze
flutter test
```
- **30 test suites** covering auth, OTP flow, floating chatbot, Razorpay wallet recharge, and ride lifecycle.

---

## 📦 Android Release & APK Artifacts

### Driver Application Builds
```bash
cd driver

# Debug APK (Development testing)
flutter build apk --debug
# Output: driver/build/app/outputs/flutter-apk/app-debug.apk

# Release APK (Optimized, R8 shrunk)
flutter build apk --release
# Output: driver/build/app/outputs/flutter-apk/app-release.apk
```

---

## 🔐 External Services & Required Credentials

To transition from local development to production, configure credentials for:

1. **Razorpay Payment Gateway**:
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` in backend `.env`.
   - Client Key ID configured in `driver/lib/services/razorpay_payment_service.dart`.
2. **Google Maps Platform**:
   - `MAPS_API_KEY` added in `driver/android/local.properties` or system environment.
3. **Firebase Services**:
   - Place project-specific `google-services.json` into `driver/android/app/` and `customer/frontend/android/app/` for Firebase Auth and Cloud Messaging (FCM).
4. **Twilio / SMS Gateway**:
   - Production OTP SMS dispatch credentials in backend `.env`.

---

## ⚠️ Known Limitations & Deployment Notes

- **Database Dependency**: The NestJS backend requires a PostgreSQL database with PostGIS for spatial driver search. Unit tests pass without external services, while full end-to-end integration tests activate when `DATABASE_URL` is provided.
- **Production Android Signing**: In the repository, `release` builds sign with debug keys by default so `flutter build apk --release` can be built and tested without committing private `.jks` keystores. For Google Play Store submission, supply your production signing keystore via environment variables or CI secrets.
