import 'package:flutter/material.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/theme/tokens.dart';
import '../../../shared/widgets/error_states/gorush_empty_state.dart';

class ActivityScreen extends StatelessWidget {
  const ActivityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Activity', style: GoRushTypography.headline),
        backgroundColor: GoRushColors.surface,
        elevation: GoRushElevation.low,
      ),
      body: const GoRushEmptyState(
        icon: Icons.receipt_long,
        title: 'No rides yet',
        message: 'Your past and upcoming rides will appear here.',
      ),
    );
  }
}
