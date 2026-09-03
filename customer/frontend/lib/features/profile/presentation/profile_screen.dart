import 'package:flutter/material.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/theme/tokens.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile', style: GoRushTypography.headline),
        backgroundColor: GoRushColors.surface,
        elevation: GoRushElevation.none,
      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(GoRushSpacing.xl),
            child: Row(
              children: [
                Container(
                  width: 64,
                  height: 64,
                  decoration: const BoxDecoration(
                    color: GoRushColors.primary,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text('G', style: TextStyle(color: GoRushColors.surface, fontSize: 24, fontWeight: FontWeight.bold)),
                  ),
                ),
                const SizedBox(width: GoRushSpacing.md),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('John Doe', style: GoRushTypography.headline),
                    const SizedBox(height: 4),
                    Text('+91 9876543210', style: GoRushTypography.body.copyWith(color: GoRushColors.textSecondary)),
                  ],
                ),
              ],
            ),
          ),
          const Divider(color: GoRushColors.border),
          _buildSettingsTile(Icons.payment, 'Payment Methods'),
          _buildSettingsTile(Icons.favorite_border, 'Saved Places'),
          _buildSettingsTile(Icons.notifications_none, 'Notifications'),
          _buildSettingsTile(Icons.lock_outline, 'Privacy'),
          _buildSettingsTile(Icons.help_outline, 'Support'),
        ],
      ),
    );
  }

  Widget _buildSettingsTile(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon, color: GoRushColors.textPrimary),
      title: Text(title, style: GoRushTypography.title),
      trailing: const Icon(Icons.chevron_right, color: GoRushColors.textMuted),
      onTap: () {},
    );
  }
}
