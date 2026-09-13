import 'package:dio/dio.dart';

abstract class AuthRepository {
  Future<void> sendOtp(String phoneNumber);
  Future<void> verifyOtp(String phoneNumber, String otp);
  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String phone,
    required String password,
  });
  Future<Map<String, dynamic>> loginWithPassword({
    required String identifier,
    required String password,
  });
  Future<void> logout();
  Future<bool> checkSession();
}

class AuthRepositoryImpl implements AuthRepository {
  final Dio _dio;

  AuthRepositoryImpl({Dio? dio})
      : _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: 'http://localhost:3001/v1',
                connectTimeout: const Duration(seconds: 10),
                receiveTimeout: const Duration(seconds: 10),
                headers: {'Content-Type': 'application/json'},
              ),
            );

  @override
  Future<void> sendOtp(String phoneNumber) async {
    try {
      await _dio.post('/auth/send-otp', data: {'phoneNumber': phoneNumber});
    } catch (_) {
      await Future.delayed(const Duration(milliseconds: 500));
    }
  }

  @override
  Future<void> verifyOtp(String phoneNumber, String otp) async {
    try {
      await _dio.post('/auth/verify-otp', data: {'phoneNumber': phoneNumber, 'otp': otp});
    } catch (_) {
      await Future.delayed(const Duration(milliseconds: 500));
    }
  }

  @override
  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String phone,
    required String password,
  }) async {
    try {
      final response = await _dio.post(
        '/auth/register',
        data: {
          'name': name,
          'email': email,
          'phoneNumber': phone,
          'password': password,
        },
      );
      return Map<String, dynamic>.from(response.data as Map);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        final data = e.response?.data;
        if (data is Map && data['message'] != null) {
          throw Exception(data['message']);
        }
      }
      rethrow;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> loginWithPassword({
    required String identifier,
    required String password,
  }) async {
    try {
      final response = await _dio.post(
        '/auth/login-password',
        data: {
          'identifier': identifier,
          'password': password,
        },
      );
      return Map<String, dynamic>.from(response.data as Map);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        final data = e.response?.data;
        if (data is Map && data['message'] != null) {
          throw Exception(data['message']);
        }
      }
      rethrow;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  @override
  Future<void> logout() async {
    try {
      await _dio.post('/auth/logout');
    } catch (_) {
      await Future.delayed(const Duration(milliseconds: 300));
    }
  }

  @override
  Future<bool> checkSession() async {
    try {
      final res = await _dio.get('/auth/sessions');
      return res.statusCode == 200;
    } catch (_) {
      return false;
    }
  }
}
