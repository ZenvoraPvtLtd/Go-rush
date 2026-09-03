import '../domain/quote_models.dart';

abstract class QuoteRepository {
  Future<List<Quote>> generateQuotes({
    required int distanceMeters,
    required int durationSeconds,
    String? idempotencyKey,
  });

  Future<Quote> getQuote(String quoteId);
}

class MockQuoteRepository implements QuoteRepository {
  @override
  Future<List<Quote>> generateQuotes({
    required int distanceMeters,
    required int durationSeconds,
    String? idempotencyKey,
  }) async {
    await Future.delayed(const Duration(seconds: 1)); // Simulate network latency

    return [
      Quote.fromJson({
        'quoteId': 'quote_bike_1',
        'rideCategory': {
          'id': 'cat_bike',
          'code': 'BIKE',
          'displayName': 'GoRush Bike',
          'description': 'Beat the traffic',
          'capacity': 1,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 5500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 2000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 3000, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Booking Fee', 'amount': {'amountMinor': 500, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 275, 'currency': 'INR'},
          'total': {'amountMinor': 5775, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': DateTime.now().toIso8601String(),
        'expiresAt': DateTime.now().add(const Duration(minutes: 5)).toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_auto_1',
        'rideCategory': {
          'id': 'cat_auto',
          'code': 'AUTO',
          'displayName': 'GoRush Auto',
          'description': 'No haggling, just riding',
          'capacity': 3,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 8500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 3000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 5000, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Booking Fee', 'amount': {'amountMinor': 500, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 425, 'currency': 'INR'},
          'total': {'amountMinor': 8925, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': DateTime.now().toIso8601String(),
        'expiresAt': DateTime.now().add(const Duration(minutes: 5)).toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_mini_1',
        'rideCategory': {
          'id': 'cat_mini',
          'code': 'MINI_SEDAN',
          'displayName': 'GoRush Mini',
          'description': 'Comfortable sedans',
          'capacity': 4,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
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
      })
    ];
  }

  @override
  Future<Quote> getQuote(String quoteId) async {
    throw UnimplementedError('Mock implementation not required for full suite in Phase 5');
  }
}
