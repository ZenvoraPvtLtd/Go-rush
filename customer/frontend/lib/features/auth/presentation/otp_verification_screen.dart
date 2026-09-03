import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/tokens.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/widgets/buttons/gorush_button.dart';

class OtpVerificationScreen extends StatefulWidget {
  final String phoneNumber;

  const OtpVerificationScreen({Key? key, required this.phoneNumber}) : super(key: key);

  @override
  State<OtpVerificationScreen> createState() => _OtpVerificationScreenState();
}

class _OtpVerificationScreenState extends State<OtpVerificationScreen> {
  final List<TextEditingController> _controllers = List.generate(6, (index) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (index) => FocusNode());
  
  bool _isLoading = false;
  String? _errorText;
  int _countdown = 30;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    setState(() => _countdown = 30);
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_countdown > 0) {
        setState(() => _countdown--);
      } else {
        timer.cancel();
      }
    });
  }

  void _verifyOtp() {
    final otp = _controllers.map((c) => c.text).join();
    if (otp.length < 6) {
      setState(() => _errorText = 'Please enter the complete 6-digit code');
      return;
    }

    setState(() {
      _isLoading = true;
      _errorText = null;
    });

    // Mock API Call
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() => _isLoading = false);
        if (otp == '123456') { // Mock valid OTP
          context.go('/auth/profile-setup');
        } else {
          setState(() => _errorText = 'Invalid verification code. Try again.');
          // Clear inputs on error
          for (var c in _controllers) {
            c.clear();
          }
          _focusNodes[0].requestFocus();
        }
      }
    });
  }

  void _onInputChanged(String value, int index) {
    setState(() => _errorText = null); // Clear error on typing
    if (value.isNotEmpty && index < 5) {
      _focusNodes[index + 1].requestFocus();
    } else if (value.isNotEmpty && index == 5) {
      _focusNodes[index].unfocus();
      _verifyOtp(); // Auto submit
    }
  }

  void _resendOtp() {
    if (_countdown == 0) {
      _startTimer();
      // Trigger resend API
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('OTP sent successfully')),
      );
    }
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
              Text('Verify your number', style: GoRushTypography.display),
              const SizedBox(height: GoRushSpacing.sm),
              RichText(
                text: TextSpan(
                  style: GoRushTypography.body.copyWith(color: GoRushColors.textSecondary),
                  children: [
                    const TextSpan(text: 'Enter the 6-digit code sent to '),
                    TextSpan(
                      text: '+91 ${widget.phoneNumber}', 
                      style: const TextStyle(color: GoRushColors.textPrimary, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: GoRushSpacing.xxl),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(
                  6,
                  (index) => SizedBox(
                    width: 45,
                    height: 56,
                    child: TextField(
                      controller: _controllers[index],
                      focusNode: _focusNodes[index],
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      maxLength: 1,
                      onChanged: (value) => _onInputChanged(value, index),
                      decoration: InputDecoration(
                        counterText: '',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(GoRushRadius.md),
                          borderSide: BorderSide(
                            color: _errorText != null ? GoRushColors.error : GoRushColors.border,
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(GoRushRadius.md),
                          borderSide: BorderSide(
                            color: _errorText != null ? GoRushColors.error : GoRushColors.primary, 
                            width: 2,
                          ),
                        ),
                      ),
                      style: GoRushTypography.title,
                    ),
                  ),
                ),
              ),
              if (_errorText != null) ...[
                const SizedBox(height: GoRushSpacing.sm),
                Text(_errorText!, style: GoRushTypography.caption.copyWith(color: GoRushColors.error)),
              ],
              const SizedBox(height: GoRushSpacing.xl),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Didn't receive code? ", style: GoRushTypography.body),
                  GestureDetector(
                    onTap: _resendOtp,
                    child: Text(
                      _countdown > 0 ? 'Retry in 00:$_countdown' : 'Resend Code',
                      style: GoRushTypography.body.copyWith(
                        color: _countdown > 0 ? GoRushColors.textMuted : GoRushColors.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                child: GoRushButton(
                  text: 'Verify',
                  isLoading: _isLoading,
                  onPressed: _verifyOtp,
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
    _timer?.cancel();
    for (var c in _controllers) {
      c.dispose();
    }
    for (var f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }
}
