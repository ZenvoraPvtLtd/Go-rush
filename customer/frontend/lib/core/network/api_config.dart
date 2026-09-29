import 'dart:io' show Platform;
import 'package:flutter/foundation.dart';

class ApiConfig {
  static String get baseUrl {
    const envUrl = String.fromEnvironment('API_URL');
    if (envUrl.isNotEmpty) {
      return envUrl;
    }
    // Android emulator/device uses 10.0.2.2 to connect to host's localhost:3001
    throw Exception('API_URL environment variable is required in production');
  }
}

