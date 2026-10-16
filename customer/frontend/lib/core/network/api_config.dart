import 'dart:io' show Platform;
import 'package:flutter/foundation.dart';

class ApiConfig {
  static String get baseUrl {
    const envUrl = String.fromEnvironment('API_URL');
    if (envUrl.isNotEmpty) {
      return envUrl;
    }
    // Android emulator connects to host via 10.0.2.2; web and desktop use localhost
    if (kIsWeb) {
      return 'http://localhost:3001';
    }
    try {
      if (Platform.isAndroid) {
        return 'http://10.0.2.2:3001';
      }
    } catch (_) {
      // Fallback if platform inspection fails
    }
    return 'http://localhost:3001';
  }
}

