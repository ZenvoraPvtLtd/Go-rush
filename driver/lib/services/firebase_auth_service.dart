import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_analytics/firebase_analytics.dart';

class FirebaseAuthService {
  static final FirebaseAuthService instance = FirebaseAuthService._();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseCrashlytics _crashlytics = FirebaseCrashlytics.instance;
  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  FirebaseAuthService._() {
    // App Verification (Play Integrity / reCAPTCHA) is enabled for REAL OTPs.
  }

  String? _verificationId;
  int? _resendToken;

  int? get lastResendToken => _resendToken;
  User? get currentUser => _auth.currentUser;

  Future<void> sendOtp(
    String phoneNumber, {
    required Function() onCodeSent,
    required Function(String errorMsg) onError,
    Function(UserCredential credential)? onAutoVerified,
    bool isResend = false,
  }) async {
    try {
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) async {
          // Automatic SMS Code Retrieval (Android Play Services)
          try {
            final userCred = await _auth.signInWithCredential(credential);
            _analytics.logEvent(name: 'driver_login_success_auto');
            if (onAutoVerified != null) {
              onAutoVerified(userCred);
            }
          } catch (e) {
            _crashlytics.recordError(e, null, reason: 'Auto OTP verification failed');
            onError('AUTH_002: Auto OTP verification failed');
          }
        },
        verificationFailed: (FirebaseAuthException e) {
          debugPrint('=== FIREBASE RAW ERROR ===');
          debugPrint('Error Code: ${e.code}');
          debugPrint('Error Message: ${e.message}');
          debugPrint('Project ID: ${_auth.app.options.projectId}');
          debugPrint('Package Name: com.gorush.driver.gorush_driver');
          debugPrint('==========================');
          _crashlytics.recordError(e, null, reason: 'Firebase verificationFailed');
          if (e.code == 'invalid-phone-number') {
            onError('AUTH_001: Invalid phone number format');
          } else if (e.code == 'too-many-requests') {
            onError('AUTH_004: Too many OTP requests. Please wait a few minutes before trying again.');
          } else if (e.code == 'quota-exceeded') {
            onError('AUTH_006: SMS quota exceeded. Please try again later.');
          } else if (e.code == 'session-expired') {
            onError('AUTH_007: SMS session expired. Please request a new OTP.');
          } else {
            onError('AUTH_005: [${e.code}] ${e.message ?? "Authentication failed."}');
          }
          _analytics.logEvent(name: 'driver_login_failed', parameters: {'error': e.code});
        },
        codeSent: (String verificationId, int? resendToken) {
          _verificationId = verificationId;
          _resendToken = resendToken;
          onCodeSent();
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          _verificationId = verificationId;
        },
      );
    } catch (e) {
      _crashlytics.recordError(e, null, reason: 'Send OTP exception');
      onError('AUTH_005: Firebase initialization failed or network error.');
    }
  }

  Future<UserCredential?> verifyOtp(String smsCode) async {
    if (_verificationId == null) {
      throw Exception('AUTH_003: OTP expired or not requested');
    }
    
    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: _verificationId!,
        smsCode: smsCode,
      );
      final userCred = await _auth.signInWithCredential(credential);
      _analytics.logEvent(name: 'driver_login_success');
      return userCred;
    } on FirebaseAuthException catch (e) {
      _crashlytics.recordError(e, null, reason: 'Manual OTP verification failed');
      _analytics.logEvent(name: 'driver_login_failed', parameters: {'error': e.code});
      throw Exception('AUTH_002: OTP verification failed');
    } catch (e) {
      throw Exception('AUTH_005: Unexpected error occurred');
    }
  }

  Future<String?> getIdToken() async {
    return await currentUser?.getIdToken();
  }

  Future<void> signOut() async {
    await _auth.signOut();
    _analytics.logEvent(name: 'driver_logout');
  }
}
