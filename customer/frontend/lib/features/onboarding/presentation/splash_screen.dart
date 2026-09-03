import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/typography.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _bootstrapApp();
  }

  Future<void> _bootstrapApp() async {
    // Phase 3: Bootstrap session (Mock verification)
    await Future.delayed(const Duration(milliseconds: 1500));
    
    // In a real app we would check token validity here
    bool hasValidSession = false; // Mocking no session
    
    if (mounted) {
      // ignore: dead_code
      if (hasValidSession) {
        context.go('/home');
      } else {
        context.go('/auth/phone');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GoRushColors.primary,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: const BoxDecoration(
                color: GoRushColors.surface,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.electric_car, size: 48, color: GoRushColors.primary),
            ),
            const SizedBox(height: 24),
            Text(
              'GoRush',
              style: GoRushTypography.display.copyWith(color: GoRushColors.surface),
            ),
          ],
        ),
      ),
    );
  }
}
