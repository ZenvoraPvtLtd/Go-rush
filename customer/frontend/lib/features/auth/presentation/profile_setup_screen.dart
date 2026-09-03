import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/tokens.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/widgets/buttons/gorush_button.dart';

class ProfileSetupScreen extends StatefulWidget {
  const ProfileSetupScreen({Key? key}) : super(key: key);

  @override
  State<ProfileSetupScreen> createState() => _ProfileSetupScreenState();
}

class _ProfileSetupScreenState extends State<ProfileSetupScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  bool _isLoading = false;

  void _saveProfile() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter your full name')),
      );
      return;
    }

    setState(() => _isLoading = true);

    // Mock API Call to save profile
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() => _isLoading = false);
        context.go('/home'); // Routing to home after successful profile setup
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Complete your profile', style: GoRushTypography.headline),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(GoRushSpacing.xl),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        color: GoRushColors.surfaceElevated,
                        shape: BoxShape.circle,
                        border: Border.all(color: GoRushColors.border),
                      ),
                      child: const Icon(Icons.person, size: 48, color: GoRushColors.textMuted),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: const BoxDecoration(
                          color: GoRushColors.primary,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.camera_alt, color: GoRushColors.surface, size: 20),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: GoRushSpacing.xxl),
              TextField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Full Name',
                  hintText: 'John Doe',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(GoRushRadius.md),
                  ),
                ),
              ),
              const SizedBox(height: GoRushSpacing.lg),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  labelText: 'Email (Optional)',
                  hintText: 'john@example.com',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(GoRushRadius.md),
                  ),
                ),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                child: GoRushButton(
                  text: 'Save & Continue',
                  isLoading: _isLoading,
                  onPressed: _saveProfile,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }
}
