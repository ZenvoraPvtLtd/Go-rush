import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/tokens.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/widgets/buttons/gorush_button.dart';

class PhoneAuthScreen extends StatefulWidget {
  const PhoneAuthScreen({super.key});

  @override
  State<PhoneAuthScreen> createState() => _PhoneAuthScreenState();
}

class _PhoneAuthScreenState extends State<PhoneAuthScreen> {
  final TextEditingController _phoneController = TextEditingController();
  bool _isLoading = false;
  String? _errorText;

  void _validateAndSubmit() {
    setState(() {
      _errorText = null;
    });

    final phone = _phoneController.text.trim();
    if (phone.isEmpty) {
      setState(() => _errorText = 'Phone number is required');
      return;
    }
    if (phone.length < 10) {
      setState(() => _errorText = 'Invalid phone number format');
      return;
    }

    setState(() => _isLoading = true);
    
    // Simulate network delay for OTP Request
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() => _isLoading = false);
        context.push('/auth/otp', extra: phone);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: GoRushColors.textPrimary),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(GoRushSpacing.xl),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Enter your mobile number', style: GoRushTypography.display),
              const SizedBox(height: GoRushSpacing.sm),
              Text(
                'We will send you a 6-digit verification code.',
                style: GoRushTypography.body.copyWith(color: GoRushColors.textSecondary),
              ),
              const SizedBox(height: GoRushSpacing.xxl),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: 16),
                    decoration: BoxDecoration(
                      border: Border.all(color: GoRushColors.border),
                      borderRadius: BorderRadius.circular(GoRushRadius.md),
                    ),
                    child: Row(
                      children: [
                        const Text('🇮🇳', style: TextStyle(fontSize: 18)),
                        const SizedBox(width: GoRushSpacing.sm),
                        Text('+91', style: GoRushTypography.title),
                        const SizedBox(width: GoRushSpacing.xs),
                        const Icon(Icons.arrow_drop_down, color: GoRushColors.textSecondary),
                      ],
                    ),
                  ),
                  const SizedBox(width: GoRushSpacing.md),
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      decoration: InputDecoration(
                        hintText: 'Mobile number',
                        errorText: _errorText,
                        counterText: '',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(GoRushRadius.md),
                          borderSide: const BorderSide(color: GoRushColors.border),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(GoRushRadius.md),
                          borderSide: const BorderSide(color: GoRushColors.border),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(GoRushRadius.md),
                          borderSide: const BorderSide(color: GoRushColors.primary, width: 2),
                        ),
                      ),
                      style: GoRushTypography.title,
                    ),
                  ),
                ],
              ),
              const Spacer(),
              RichText(
                text: TextSpan(
                  style: GoRushTypography.caption.copyWith(color: GoRushColors.textSecondary),
                  children: const [
                    TextSpan(text: 'By continuing, you agree to our '),
                    TextSpan(text: 'Terms of Service', style: TextStyle(color: GoRushColors.primary, fontWeight: FontWeight.bold)),
                    TextSpan(text: ' and '),
                    TextSpan(text: 'Privacy Policy', style: TextStyle(color: GoRushColors.primary, fontWeight: FontWeight.bold)),
                    TextSpan(text: '.'),
                  ],
                ),
              ),
              const SizedBox(height: GoRushSpacing.md),
              SizedBox(
                width: double.infinity,
                child: GoRushButton(
                  label: 'Continue',
                  isLoading: _isLoading,
                  onPressed: _validateAndSubmit,
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
    _phoneController.dispose();
    super.dispose();
  }
}
