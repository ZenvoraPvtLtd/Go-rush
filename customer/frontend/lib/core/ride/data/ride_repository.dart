import '../domain/ride_models.dart';

abstract class RideRepository {
  Future<Ride> createRide({
    required String quoteId,
    required String idempotencyKey,
  });

  Future<Ride?> getActiveRide();

  Future<Ride> getRide(String rideId);

  Future<Ride> cancelRide({
    required String rideId,
    required String reason,
  });
}

class MockRideRepository implements RideRepository {
  Ride? _mockActiveRide;

  @override
  Future<Ride> createRide({
    required String quoteId,
    required String idempotencyKey,
  }) async {
    await Future.delayed(const Duration(seconds: 1)); // Network sim

    if (_mockActiveRide != null) {
      throw Exception('RIDE_ALREADY_ACTIVE: You already have an active ride.');
    }

    _mockActiveRide = Ride.fromJson({
      'rideId': 'ride_abc123',
      'customerId': 'cust_123',
      'status': 'SEARCHING',
      'quoteSnapshot': {
        'quoteId': quoteId,
        'rideCategory': {
          'id': 'cat_mini',
          'code': 'MINI_SEDAN',
          'displayName': 'GoRush Mini',
          'description': 'Comfortable sedans',
          'capacity': 4,
        },
        'distanceMeters': 5500,
        'durationSeconds': 900,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 12500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 5000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 7000, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Booking Fee', 'amount': {'amountMinor': 500, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 625, 'currency': 'INR'},
          'total': {'amountMinor': 13125, 'currency': 'INR'},
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
}
