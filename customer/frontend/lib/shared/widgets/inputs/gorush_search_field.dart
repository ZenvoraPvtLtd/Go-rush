import 'package:flutter/material.dart';
import '../../theme/colors.dart';
import '../../theme/typography.dart';
import '../../theme/tokens.dart';

class GoRushSearchField extends StatelessWidget {
  final String hintText;
  final VoidCallback? onTap;
  final bool readOnly;

  const GoRushSearchField({
    super.key,
    required this.hintText,
    this.onTap,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(GoRushRadius.md),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: GoRushSpacing.md),
        decoration: BoxDecoration(
          color: GoRushColors.surfaceElevated,
          borderRadius: BorderRadius.circular(GoRushRadius.md),
        ),
        child: Row(
          children: [
            const Icon(Icons.search, color: GoRushColors.textPrimary),
            const SizedBox(width: GoRushSpacing.sm),
            Expanded(
              child: Text(
                hintText,
                style: GoRushTypography.title.copyWith(color: GoRushColors.textMuted),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
