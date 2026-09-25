import 'package:dio/dio.dart';
import '../domain/ride_models.dart';

abstract class RideRepository {
  Future<Ride> createRide({
    required String quoteId,
    required String idempotencyKey,
    String? pickupAddress,
    String? dropoffAddress,
    String? paymentMethod,
    String? specialInstructions,
  });

  Future<Ride?> getActiveRide();

  Future<Ride> getRide(String rideId);

  Future<Ride> cancelRide({
    required String rideId,
    required String reason,
  });

  Future<Map<String, dynamic>> submitRating({
    required String rideId,
    required int rating,
    List<String>? feedbackTags,
    String? comment,
    double? tipAmount,
  });

  Future<Map<String, dynamic>> reportIssue({
    required String rideId,
    required String issueCategory,
    required String description,
  });

  Future<Map<String, dynamic>> reportLostItem({
    required String rideId,
    required String itemCategory,
    required String description,
    String? preferredContact,
  });

  Future<Map<String, dynamic>> getReceipt({
    required String rideId,
  });
}

class HttpRideRepository implements RideRepository {
  final Dio _dio;
  final MockRideRepository _fallback = MockRideRepository();

  HttpRideRepository({Dio? dio}) : _dio = dio ?? Dio(BaseOptions(baseUrl: 'http://localhost:3001/v1'));

  @override
  Future<Ride> createRide({
    required String quoteId,
    required String idempotencyKey,
    String? pickupAddress,
    String? dropoffAddress,
    String? paymentMethod,
    String? specialInstructions,
  }) async {
    try {
      final response = await _dio.post(
        '/rides',
        data: {
          'quoteId': quoteId,
          'pickupAddress': pickupAddress,
          'dropoffAddress': dropoffAddress,
          'paymentMethod': paymentMethod,
          'specialInstructions': specialInstructions,
        },
        options: Options(
          headers: {
            'Authorization': 'Bearer mock_access_token',
            'Idempotency-Key': idempotencyKey,
          },
        ),
      );
      return Ride.fromJson(response.data as Map<String, dynamic>);
    } catch (_) {
      return _fallback.createRide(
        quoteId: quoteId,
        idempotencyKey: idempotencyKey,
        pickupAddress: pickupAddress,
        dropoffAddress: dropoffAddress,
        paymentMethod: paymentMethod,
        specialInstructions: specialInstructions,
      );
    }
  }

  @override
  Future<Ride?> getActiveRide() async {
    try {
      final response = await _dio.get(
        '/rides/active',
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      if (response.data != null) {
        return Ride.fromJson(response.data as Map<String, dynamic>);
      }
    } catch (_) {
      return _fallback.getActiveRide();
    }
    return null;
  }

  @override
  Future<Ride> getRide(String rideId) async {
    try {
      final response = await _dio.get(
        '/rides/$rideId',
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return Ride.fromJson(response.data as Map<String, dynamic>);
    } catch (_) {
      return _fallback.getRide(rideId);
    }
  }

  @override
  Future<Ride> cancelRide({required String rideId, required String reason}) async {
    try {
      final response = await _dio.post(
        '/rides/$rideId/cancel',
        data: {'reason': reason},
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return Ride.fromJson(response.data as Map<String, dynamic>);
    } catch (_) {
      return _fallback.cancelRide(rideId: rideId, reason: reason);
    }
  }

  @override
  Future<Map<String, dynamic>> submitRating({
    required String rideId,
    required int rating,
    List<String>? feedbackTags,
    String? comment,
    double? tipAmount,
  }) async {
    try {
      final response = await _dio.post(
        '/rides/$rideId/rating',
        data: {
          'rating': rating,
          'feedbackTags': feedbackTags ?? [],
          'comment': comment ?? '',
          'tipAmount': tipAmount ?? 0,
        },
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return response.data as Map<String, dynamic>;
    } catch (_) {
      return _fallback.submitRating(
        rideId: rideId,
        rating: rating,
        feedbackTags: feedbackTags,
        comment: comment,
        tipAmount: tipAmount,
      );
    }
  }

  @override
  Future<Map<String, dynamic>> reportIssue({
    required String rideId,
    required String issueCategory,
    required String description,
  }) async {
    try {
      final response = await _dio.post(
        '/rides/$rideId/issue',
        data: {
          'issueCategory': issueCategory,
          'description': description,
        },
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return response.data as Map<String, dynamic>;
    } catch (_) {
      return _fallback.reportIssue(
        rideId: rideId,
        issueCategory: issueCategory,
        description: description,
      );
    }
  }

  @override
  Future<Map<String, dynamic>> reportLostItem({
    required String rideId,
    required String itemCategory,
    required String description,
    String? preferredContact,
  }) async {
    try {
      final response = await _dio.post(
        '/rides/$rideId/lost-item',
        data: {
          'itemCategory': itemCategory,
          'description': description,
          'preferredContact': preferredContact,
        },
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return response.data as Map<String, dynamic>;
    } catch (_) {
      return _fallback.reportLostItem(
        rideId: rideId,
        itemCategory: itemCategory,
        description: description,
        preferredContact: preferredContact,
      );
    }
  }

  @override
  Future<Map<String, dynamic>> getReceipt({required String rideId}) async {
    try {
      final response = await _dio.get(
        '/rides/$rideId/receipt',
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return response.data as Map<String, dynamic>;
    } catch (_) {
      return _fallback.getReceipt(rideId: rideId);
    }
  }
}

class MockRideRepository implements RideRepository {
  Ride? _mockActiveRide;

  @override
  Future<Ride> createRide({
    required String quoteId,
    required String idempotencyKey,
    String? pickupAddress,
    String? dropoffAddress,
    String? paymentMethod,
    String? specialInstructions,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600)); // Network sim

    if (_mockActiveRide != null) {
      throw Exception('RIDE_ALREADY_ACTIVE: You already have an active ride.');
    }

    _mockActiveRide = Ride.fromJson({
      'rideId': 'ride_abc123',
      'customerId': 'cust_123',
      'status': 'SEARCHING',
      'pickupAddress': pickupAddress ?? 'Sector 63, Noida (GPS Fixed)',
      'dropoffAddress': dropoffAddress ?? 'Terminal 3, IGI Airport, New Delhi',
      'paymentMethod': paymentMethod ?? 'Google Pay',
      'specialInstructions': specialInstructions ?? '',
      'otpCode': '4829',
      'quoteSnapshot': {
        'quoteId': quoteId,
        'rideCategory': {
          'id': 'cat_sedan',
          'code': 'SEDAN',
          'displayName': 'GoSedan',
          'description': 'Premium spacious sedan with extra legroom',
          'capacity': 4,
          'etaMinutes': 3,
        },
        'distanceMeters': 5500,
        'durationSeconds': 900,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 18000, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 8000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 8500, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1500, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 900, 'currency': 'INR'},
          'total': {'amountMinor': 18900, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': DateTime.now().toIso8601String(),
        'expiresAt': DateTime.now().add(const Duration(minutes: 5)).toIso8601String(),
      },
      'createdAt': DateTime.now().toIso8601String(),
      'updatedAt': DateTime.now().toIso8601String(),
    });

    return _mockActiveRide!;
  }

  @override
  Future<Ride?> getActiveRide() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _mockActiveRide;
  }

  @override
  Future<Ride> getRide(String rideId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (_mockActiveRide?.rideId == rideId) return _mockActiveRide!;
    throw Exception('Not found');
  }

  @override
  Future<Ride> cancelRide({required String rideId, required String reason}) async {
    await Future.delayed(const Duration(seconds: 1));
    if (_mockActiveRide?.rideId == rideId) {
       _mockActiveRide = Ride(
        rideId: _mockActiveRide!.rideId,
        customerId: _mockActiveRide!.customerId,
        status: RideStatus.cancelled,
        quoteSnapshot: _mockActiveRide!.quoteSnapshot,
        createdAt: _mockActiveRide!.createdAt,
        updatedAt: DateTime.now(),
        cancellationReason: reason,
      );
      final r = _mockActiveRide!;
      _mockActiveRide = null; // Clear active
      return r;
    }
    throw Exception('Cannot cancel');
  }

  @override
  Future<Map<String, dynamic>> submitRating({
    required String rideId,
    required int rating,
    List<String>? feedbackTags,
    String? comment,
    double? tipAmount,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600));
    _mockActiveRide = null;
    return {
      'status': 'RATING_SUBMITTED',
      'rideId': rideId,
      'rating': rating,
      'feedbackTags': feedbackTags ?? [],
      'comment': comment ?? '',
      'tipAmount': tipAmount ?? 0,
      'driverThanked': true,
      'timestamp': DateTime.now().toIso8601String(),
    };
  }

  @override
  Future<Map<String, dynamic>> reportIssue({
    required String rideId,
    required String issueCategory,
    required String description,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return {
      'ticketId': 'ticket_${DateTime.now().millisecondsSinceEpoch}',
      'rideId': rideId,
      'issueCategory': issueCategory,
      'status': 'OPEN',
      'expectedResponseHours': 2,
      'createdAt': DateTime.now().toIso8601String(),
    };
  }

  @override
  Future<Map<String, dynamic>> reportLostItem({
    required String rideId,
    required String itemCategory,
    required String description,
    String? preferredContact,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600));
    return {
      'caseId': 'case_lost_${DateTime.now().millisecondsSinceEpoch}',
      'rideId': rideId,
      'itemCategory': itemCategory,
      'driverNotified': true,
      'status': 'SEARCHING_DRIVER',
      'createdAt': DateTime.now().toIso8601String(),
    };
  }

  @override
  Future<Map<String, dynamic>> getReceipt({required String rideId}) async {
    await Future.delayed(const Duration(milliseconds: 400));
    return {
      'invoiceId': 'INV-2026-${rideId.substring(0, rideId.length > 6 ? 6 : rideId.length).toUpperCase()}',
      'rideId': rideId,
      'date': DateTime.now().toIso8601String(),
      'driverName': 'Ramesh Kumar',
      'vehicle': 'Maruti Suzuki Dzire (UP 16 AB 4829)',
      'pickupAddress': 'Sector 63, Noida (GPS Fixed)',
      'dropoffAddress': 'Terminal 3, IGI Airport, New Delhi',
      'paymentMethod': 'Google Pay',
      'breakdown': {
        'subtotal': {'amountMinor': 18000, 'currency': 'INR'},
        'components': [
          {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 8000, 'currency': 'INR'}},
          {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 8500, 'currency': 'INR'}},
          {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1500, 'currency': 'INR'}},
        ],
        'discount': {'amountMinor': 0, 'currency': 'INR'},
        'tax': {'amountMinor': 900, 'currency': 'INR'},
        'total': {'amountMinor': 18900, 'currency': 'INR'},
      },
      'pdfDownloadUrl': 'https://api.gorush.app/v1/receipts/$rideId.pdf',
    };
  }
}

