import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'driver_backend_service.dart';

class FirebaseMessagingService {
  FirebaseMessagingService._();
  static final FirebaseMessagingService instance = FirebaseMessagingService._();

  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  Future<void> init() async {
    try {
      NotificationSettings settings = await _messaging.requestPermission(
        alert: true,
        badge: true,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        String? token = await _messaging.getToken();
        if (token != null) {
          await _sendTokenToBackend(token);
        }

        _messaging.onTokenRefresh.listen((newToken) {
          _sendTokenToBackend(newToken);
        });

        // Handle foreground messages
        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
          debugPrint('Foreground message received: ${message.notification?.title}');
          // Depending on the ride state, fetch actual ride from backend.
          // Don't treat notification as source of truth.
        });

        // Handle background messages
        FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
      } else {
        debugPrint('FCM_001: Notification permission denied');
      }
    } catch (e) {
      FirebaseCrashlytics.instance.recordError(e, null, reason: 'FCM_002: FCM token registration failed');
    }
  }

  Future<void> _sendTokenToBackend(String token) async {
    try {
      // Create a conceptual API call to GoRush backend
      await DriverBackendService.instance.updateDeviceToken(token, Platform.isAndroid ? 'android' : 'ios');
    } catch (e) {
      debugPrint('Failed to send FCM token to backend: $e');
    }
  }
}

// Background handler must be a top-level function
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  debugPrint("Handling a background message: ${message.messageId}");
}
