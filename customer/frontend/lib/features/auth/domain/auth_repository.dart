abstract class AuthRepository {
  Future<void> sendOtp(String phoneNumber);
  Future<void> verifyOtp(String phoneNumber, String otp);
  Future<void> logout();
  Future<bool> checkSession();
}

class AuthRepositoryImpl implements AuthRepository {
  @override
  Future<void> sendOtp(String phoneNumber) async {
    // Network call to send OTP
    await Future.delayed(const Duration(seconds: 1));
  }

  @override
  Future<void> verifyOtp(String phoneNumber, String otp) async {
    // Network call to verify OTP
    await Future.delayed(const Duration(seconds: 1));
  }

  @override
  Future<void> logout() async {
    // Call logout endpoint
    await Future.delayed(const Duration(milliseconds: 500));
  }

  @override
  Future<bool> checkSession() async {
    // Check with TokenManager/SessionManager
    return false;
  }
}
