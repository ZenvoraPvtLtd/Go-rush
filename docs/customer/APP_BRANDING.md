# Customer App Branding Updates

## Overview
This document records the updates made to change the user-facing application name of the Flutter Customer App.

- **Previous display name**: `frontend`
- **New display name**: `GoRush`

## Modified Files

### Android
- `customer/frontend/android/app/src/main/AndroidManifest.xml`
  - Changed `android:label="frontend"` to `android:label="GoRush"`. This updates the launcher icon label and app name displayed in the Android system.

### iOS
- `customer/frontend/ios/Runner/Info.plist`
  - Changed `CFBundleDisplayName` from `Frontend` to `GoRush`.
  - Changed `CFBundleName` from `frontend` to `GoRush`.
  - This updates the application name shown on the iOS home screen and within the system settings.

### Web
- `customer/frontend/web/index.html`
  - Changed `<meta name="apple-mobile-web-app-title" content="frontend">` to `content="GoRush"`.
  - Changed `<title>frontend</title>` to `<title>GoRush</title>`.
- `customer/frontend/web/manifest.json`
  - Changed `name` and `short_name` from `"frontend"` to `"GoRush"`.

## Application IDs Intentionally Preserved
- The Flutter project folder remains `customer/frontend/`.
- The `pubspec.yaml` package name remains `name: frontend`.
- The Android `applicationId` and iOS `bundle identifier` remain unchanged to prevent breaking existing configurations, backend links, or App Store / Play Store connections.
- No changes were made to the application logic, UI, routing, or functionality.
