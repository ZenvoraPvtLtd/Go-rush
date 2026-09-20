# Travel Partner Link Fix

## Root Cause
The `canLaunchUrl` API from the `url_launcher` package was returning `false` on Android 11+ (API 30+) devices for standard HTTP/HTTPS URLs. This is due to Android's package visibility requirements. Because `canLaunchUrl` returned `false`, the fallback error mechanism triggered instead of actually attempting to launch the URL. 

## Files Changed
- `customer/frontend/android/app/src/main/AndroidManifest.xml`: Added `<queries>` block for the `https` scheme to satisfy Android 11+ package visibility rules.
- `customer/frontend/lib/core/utils/external_launcher_service.dart`: Created a new centralized service to handle platform-specific launching.
- `customer/frontend/lib/features/travel/presentation/travel_screen.dart`: Updated the partner logo `onTap` handler to use `ExternalLauncherService` instead of directly calling `url_launcher`.

## Centralized URL Configuration
The project already utilizes a centralized configuration located at `lib/features/travel/domain/models/travel_partner_config.dart`. This architecture was preserved to avoid duplication. The configured URLs are:
- Goibibo: `https://www.goibibo.com`
- redBus: `https://www.redbus.in`
- Confirmtkt: `https://www.confirmtkt.com`

## Launch Strategy

### Web Behavior
On Flutter Web, `url_launcher` manages the external opening natively (usually in a new browser tab or window).

### Android Behavior
The `LaunchMode.externalApplication` is enforced. We bypass the `canLaunchUrl` check (which is notoriously flaky for web URLs due to intent-filter nuances) and directly execute `launchUrl()`. This delegates the intent to the OS. If an app link is configured and the app is installed, the Android OS will seamlessly open the partner's native app.

### iOS Behavior
Similar to Android, `LaunchMode.externalApplication` pushes the URL to the iOS system. iOS will evaluate if the Universal Link can be intercepted by an installed native app.

### Fallback Behavior
If `launchUrl()` fails (e.g., no browser exists, or URL is malformed), an exception is caught, and a graceful `SnackBar` is presented to the user without crashing the application.

## Testing Performed
- **Flutter Web:** Verified cards successfully open their respective URLs in a new browser tab.
- **Android / iOS:** Since physical devices were unavailable for manual validation, the implementation relies on the standard OS-level handling via `LaunchMode.externalApplication`. A Flutter analyzer pass was run to ensure no regressions or syntax issues were introduced.

## Environment/Device Limitations
- Without physical device testing, we rely on the OS's handling of the `ACTION_VIEW` intent (Android) and Universal Links (iOS). 
- If a user lacks a default browser and doesn't have the partner app installed, the fallback snackbar will gracefully handle the failure.
