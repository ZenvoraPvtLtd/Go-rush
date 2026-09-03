import 'package:flutter/material.dart';
import '../../../core/pricing/domain/quote_models.dart';
import '../../../shared/theme/gorush_colors.dart';
import '../../../shared/theme/gorush_typography.dart';
import '../../../shared/theme/gorush_spacing.dart';

class FareBreakdownSheet extends StatelessWidget {
  final Quote quote;

  const FareBreakdownSheet({Key? key, required this.quote}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(GoRushSpacing.xl),
      decoration: const BoxDecoration(
        color: GoRushColors.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Fare Breakdown', style: GoRushTypography.h3),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.pop(context),
              )
            ],
          ),
          const SizedBox(height: GoRushSpacing.lg),
          ...quote.fareBreakdown.components.map((component) {
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.xs),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(component.label, style: GoRushTypography.body1),
                  Text(component.amount.formatted, style: GoRushTypography.body1),
                ],
              ),
            );
          }).toList(),
          const Divider(height: GoRushSpacing.xl),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Tax', style: GoRushTypography.body1),
              Text(quote.fareBreakdown.tax.formatted, style: GoRushTypography.body1),
            ],
          ),
          const SizedBox(height: GoRushSpacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Total', style: GoRushTypography.h4),
              Text(quote.fareBreakdown.total.formatted, style: GoRushTypography.h4),
            ],
          ),
          const SizedBox(height: GoRushSpacing.xl),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: GoRushColors.primary,
              foregroundColor: GoRushColors.onPrimary,
              padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.md),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: Text('Done', style: GoRushTypography.button),
          )
        ],
      ),
    );
  }
}
