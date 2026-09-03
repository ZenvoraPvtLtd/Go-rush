import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../app/shell/app_shell.dart';
import '../features/onboarding/presentation/splash_screen.dart';
import '../features/home/presentation/home_screen.dart';
import '../features/ride_history/presentation/activity_screen.dart';
import '../features/safety/presentation/safety_screen.dart';
import '../features/profile/presentation/profile_screen.dart';
import '../features/auth/presentation/phone_auth_screen.dart';
import '../features/auth/presentation/otp_verification_screen.dart';
import '../features/auth/presentation/profile_setup_screen.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();
final GlobalKey<NavigatorState> _shellNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter goRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/auth/phone',
      builder: (context, state) => const PhoneAuthScreen(),
    ),
    GoRoute(
      path: '/auth/otp',
      builder: (context, state) {
        final phone = state.extra as String? ?? '';
        return OtpVerificationScreen(phoneNumber: phone);
      },
    ),
    GoRoute(
      path: '/auth/profile-setup',
      builder: (context, state) => const ProfileSetupScreen(),
    ),
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) => AppShell(child: child),
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const HomeScreen(),
        ),
        GoRoute(
          path: '/activity',
          builder: (context, state) => const ActivityScreen(),
        ),
        GoRoute(
          path: '/safety',
          builder: (context, state) => const SafetyScreen(rideId: ''),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfileScreen(),
        ),
      ],
    ),
  ],
);
