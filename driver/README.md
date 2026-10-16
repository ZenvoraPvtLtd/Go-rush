# GoRush Driver Partner Flutter Application 🚖

The official GoRush Driver Partner mobile application built with Flutter, Riverpod, Dio, and Material 3 design. Designed for enterprise-grade real-time dispatch, live tracking, trip lifecycle execution, Razorpay driver wallet recharges, and earnings management.

---

## 📱 Application Overview & Workflows

- **Authentication & Onboarding**: Phone number authentication with OTP verification, onboarding slides, and persistent auth session management.
- **Registration & Driver KYC**: Driver profile setup, driving license, vehicle documents, and verification status tracking.
- **Vehicle Details & Management**: Multi-vehicle support, insurance details, and document upload management.
- **Driver Availability**: One-tap toggle for Online / Offline status with real-time heartbeat and presence broadcasting to the backend dispatch engine.
- **Ride Request Dispatch Offers**: Full-screen dispatch offer modal with a 15-second radial timer, upfront fare, pickup distance, and destination details.
- **Accept / Reject Lifecycle**: Drivers can accept or decline dispatch offers. Declining an offer automatically triggers backend candidate rematching.
- **Turn-by-Turn Navigation & Map**: Google Maps integration with live polyline rendering, turn-by-turn navigation, location tracking, and real-time GPS updates.
- **Trip Lifecycle States**:
  - `ACCEPTED`: Heading to pickup location with route overview and passenger assistance chat.
  - `ARRIVED`: Geofenced arrival notification sent to the passenger.
  - `STARTED`: Secure 4-digit start OTP verification before trip begins.
  - `COMPLETED`: Distance & duration recalculation, fare breakdown receipt, and trip rating.
- **Driver Wallet & Razorpay Integration**:
  - Wallet balance display and transaction ledger.
  - Instant wallet recharge using official **Razorpay Flutter SDK** (`razorpay_flutter`).
  - Automatic order creation, signature verification, and wallet credit syncing.
- **Earnings & Payouts**: Real-time daily, weekly, and monthly earnings breakdown, gross fare, platform commission cut, net earnings, and instant cash-out requests.
- **Driver Safety Hub & SOS**: Emergency SOS alert triggering backend dispatch alerts and local emergency services.
- **AI Driver Support Assistant**: Built-in 24/7 in-app floating chatbot for quick answers to policy, trip disputes, and earnings queries.

---

## 🛠️ Project Structure

```text
driver/
├── android/               # Native Android configuration (Application ID: com.gorush.driver.gorush_driver)
├── ios/                   # Native iOS configuration
├── lib/
│   ├── core/              # Network clients, API configuration, theme, and security
│   ├── models/            # Data models (Ride, Driver, Wallet, Earning, User)
│   ├── screens/           # 30+ driver screens (Dashboard, Navigation, Wallet, KYC, SOS, etc.)
│   ├── services/          # Services (Auth, Ride, Wallet, Razorpay, Location, Socket)
│   ├── widgets/           # Reusable UI widgets and custom components
│   └── main.dart          # Application entry point with route initialization
├── test/                  # Test suites (unit, widget, and integration tests)
├── assets/                # Static icons, branding assets, and illustration images
├── pubspec.yaml           # Flutter dependencies and asset configuration
└── README.md              # Driver setup and build guide
```

---

## 🚀 Prerequisites

- **Flutter SDK**: `>= 3.24.0` (Dart SDK `>= 3.5.0 < 4.0.0`)
- **Java Development Kit (JDK)**: OpenJDK 17
- **Android SDK**: `compileSdk = 36`, `targetSdk = 34`, `minSdk = 21`

---

## 💻 Getting Started & Local Development

### 1. Install Dependencies
```bash
cd driver
flutter pub get
```

### 2. Configure Local API Networking
By default, the driver app targets candidate backend endpoints dynamically or honors the `API_BASE_URL` compilation define:

- **Android Emulator**: Uses `10.0.2.2:5000` (or host IP) to reach your local backend.
- **Physical Device**: Connect to your machine's LAN IP (e.g., `http://192.168.1.X:5000`).

To run with a custom API URL:
```bash
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:5000
```

---

## 🧪 Testing & Code Quality

Run the static analyzer:
```bash
flutter analyze
```

Run all unit and widget tests:
```bash
flutter test
```

---

## 📦 Android APK Build Commands

### Debug APK
Build a debug APK for development testing:
```bash
flutter build apk --debug
```
*Output artifact:* `build/app/outputs/flutter-apk/app-debug.apk`

### Release APK
Build an optimized release APK with R8 code shrinking and tree-shaking:
```bash
flutter build apk --release
```
*Output artifact:* `build/app/outputs/flutter-apk/app-release.apk`

---

## 🔐 Credentials & Environment Setup

- **Razorpay**: Configure your test or production Key ID in `lib/services/razorpay_payment_service.dart` or pass via compilation define `RAZORPAY_KEY_ID`.
- **Google Maps**: Add your Google Maps API key to `android/local.properties`:
  ```properties
  MAPS_API_KEY=your_google_maps_api_key_here
  ```
- **Firebase**: Replace `android/app/google-services.json` with your project's Firebase configuration to enable push notifications (`firebase_messaging`) and crash analytics.
