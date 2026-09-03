import 'package:flutter/material.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/theme/tokens.dart';
import '../domain/share_session.dart';
import 'share_ride_sheet.dart';

class SafetyScreen extends StatefulWidget {
  final String rideId;

  const SafetyScreen({super.key, required this.rideId});

  @override
  State<SafetyScreen> createState() => _SafetyScreenState();
}

class _SafetyScreenState extends State<SafetyScreen> {
  // MOCK STATE
  List<RideShareSession> activeShares = [];

  void _showShareSheet() async {
    final success = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => ShareRideSheet(rideId: widget.rideId),
    );

    if (success == true) {
      setState(() {
        activeShares.add(RideShareSession(
          id: 'share_${DateTime.now().millisecondsSinceEpoch}',
          recipientName: 'Family Member',
          status: RideShareStatus.active,
          expiresAt: DateTime.now().add(const Duration(hours: 24)),
        ));
      });
      if (mounted) {
         ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('WhatsApp message sent!')));
      }
    }
  }

  void _revokeShare(String id) {
    setState(() {
      activeShares.removeWhere((s) => s.id == id);
    });
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Live sharing stopped.')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GoRushColors.background,
      appBar: AppBar(
        title: const Text('Safety & Trusted Contacts'),
        backgroundColor: GoRushColors.surface,
        foregroundColor: GoRushColors.onSurface,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(GoRushSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(GoRushSpacing.md),
              decoration: BoxDecoration(
                color: GoRushColors.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12)
              ),
              child: Row(
                children: [
                  const Icon(Icons.shield, color: GoRushColors.primary, size: 32),
                  const SizedBox(width: GoRushSpacing.md),
                  Expanded(
                    child: Text(
                      'Your ride is monitored. You can share your live location securely with trusted contacts.',
                      style: GoRushTypography.body2,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: GoRushSpacing.xl),
            ElevatedButton.icon(
              icon: const Icon(Icons.share),
              label: Text('Share Live Ride', style: GoRushTypography.button),
              onPressed: _showShareSheet,
              style: ElevatedButton.styleFrom(
                backgroundColor: GoRushColors.primary,
                foregroundColor: GoRushColors.onPrimary,
                padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.md),
              ),
            ),
            const SizedBox(height: GoRushSpacing.xl),
            Text('Active Shares', style: GoRushTypography.h3),
            const SizedBox(height: GoRushSpacing.md),
            if (activeShares.isEmpty)
              Text('You are not sharing this ride with anyone.', style: GoRushTypography.body2.copyWith(color: Colors.grey)),
            ...activeShares.map((share) => Card(
              margin: const EdgeInsets.only(bottom: GoRushSpacing.sm),
              child: ListTile(
                title: Text(share.recipientName, style: GoRushTypography.body1),
                subtitle: const Text('Live location active'),
                trailing: TextButton(
                  onPressed: () => _revokeShare(share.id),
                  child: const Text('Stop', style: TextStyle(color: GoRushColors.error)),
                ),
              ),
            ))
          ],
        ),
      ),
    );
  }
}
