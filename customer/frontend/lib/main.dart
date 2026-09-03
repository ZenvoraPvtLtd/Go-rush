import 'package:flutter/material.dart';
import 'routing/router.dart';
import 'shared/theme/colors.dart';
import 'shared/theme/typography.dart';

void main() {
  runApp(const GoRushApp());
}

class GoRushApp extends StatelessWidget {
  const GoRushApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'GoRush',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: GoRushColors.background,
        primaryColor: GoRushColors.primary,
        colorScheme: ColorScheme.light(
          primary: GoRushColors.primary,
          secondary: GoRushColors.accent,
          surface: GoRushColors.surface,
          error: GoRushColors.error,
        ),
        fontFamily: GoRushTypography.fontFamily,
      ),
      routerConfig: goRouter,
    );
  }
}
