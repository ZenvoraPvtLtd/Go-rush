import 'package:flutter/material.dart';
import '../../../../shared/theme/colors.dart';
import '../../../../shared/theme/tokens.dart';
import '../../../../shared/theme/typography.dart';
import '../../../../shared/widgets/cards/gorush_card.dart';

class GoRushRideCategoryCard extends StatelessWidget {
  final String title;
  final String capacity;
  final String eta;
  final String fare;
  final bool isSelected;
  final VoidCallback onTap;

  const GoRushRideCategoryCard({
    super.key,
    required this.title,
    required this.capacity,
    required this.eta,
    required this.fare,
    this.isSelected = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(GoRushRadius.md),
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: isSelected ? GoRushColors.primary : Colors.transparent,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(GoRushRadius.md),
        ),
        child: GoRushCard(
          padding: const EdgeInsets.all(GoRushSpacing.md),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: const BoxDecoration(
                  color: GoRushColors.surfaceElevated,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.directions_car, color: GoRushColors.textPrimary),
              ),
              const SizedBox(width: GoRushSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: GoRushTypography.title),
                    const SizedBox(height: 2),
                    Row(
                      children: [
                        const Icon(Icons.person, size: 14, color: GoRushColors.textSecondary),
                        const SizedBox(width: 2),
                        Text(capacity, style: GoRushTypography.caption),
                        const SizedBox(width: GoRushSpacing.sm),
                        Text('• $eta', style: GoRushTypography.caption),
                      ],
                    ),
                  ],
                ),
              ),
              Text(fare, style: GoRushTypography.title),
            ],
          ),
        ),
      ),
    );
  }
}
