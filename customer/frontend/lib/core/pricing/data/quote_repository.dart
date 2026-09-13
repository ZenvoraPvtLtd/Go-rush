import 'package:dio/dio.dart';
import '../domain/quote_models.dart';
import '../domain/money.dart';

abstract class QuoteRepository {
  Future<List<Quote>> generateQuotes({
    required int distanceMeters,
    required int durationSeconds,
    String? idempotencyKey,
  });

  Future<Quote> getQuote(String quoteId);
  Future<Quote> applyPromo(String quoteId, String promoCode);
}

class HttpQuoteRepository implements QuoteRepository {
  final Dio _dio;
  final MockQuoteRepository _fallback = MockQuoteRepository();

  HttpQuoteRepository({Dio? dio}) : _dio = dio ?? Dio(BaseOptions(baseUrl: 'http://localhost:3001/v1'));

  @override
  Future<List<Quote>> generateQuotes({
    required int distanceMeters,
    required int durationSeconds,
    String? idempotencyKey,
  }) async {
    try {
      final key = idempotencyKey ?? DateTime.now().millisecondsSinceEpoch.toString();
      final response = await _dio.post(
        '/quotes',
        data: {
          'distanceMeters': distanceMeters,
          'durationSeconds': durationSeconds,
        },
        options: Options(
          headers: {
            'Authorization': 'Bearer mock_access_token',
            'Idempotency-Key': key,
          },
        ),
      );
      if (response.data is List) {
        final list = (response.data as List)
            .map((item) => Quote.fromJson(item as Map<String, dynamic>))
            .toList();
        if (list.isNotEmpty) return list;
      }
    } catch (_) {
      // Automatic fallback to mock repository if server is unreachable
    }
    return _fallback.generateQuotes(
      distanceMeters: distanceMeters,
      durationSeconds: durationSeconds,
      idempotencyKey: idempotencyKey,
    );
  }

  @override
  Future<Quote> getQuote(String quoteId) async {
    try {
      final response = await _dio.get(
        '/quotes/$quoteId',
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return Quote.fromJson(response.data as Map<String, dynamic>);
    } catch (_) {
      return _fallback.getQuote(quoteId);
    }
  }

  @override
  Future<Quote> applyPromo(String quoteId, String promoCode) async {
    try {
      final response = await _dio.post(
        '/quotes/apply-promo',
        data: {
          'quoteId': quoteId,
          'promoCode': promoCode,
        },
        options: Options(headers: {'Authorization': 'Bearer mock_access_token'}),
      );
      return Quote.fromJson(response.data as Map<String, dynamic>);
    } catch (_) {
      return _fallback.applyPromo(quoteId, promoCode);
    }
  }
}

class MockQuoteRepository implements QuoteRepository {
  final Map<String, Quote> _cachedQuotes = {};

  @override
  Future<List<Quote>> generateQuotes({
    required int distanceMeters,
    required int durationSeconds,
    String? idempotencyKey,
  }) async {
    await Future.delayed(const Duration(milliseconds: 300)); // Network simulation latency

    final now = DateTime.now();
    final expires = now.add(const Duration(minutes: 5));

    final list = [
      Quote.fromJson({
        'quoteId': 'quote_bike_1',
        'rideCategory': {
          'id': 'cat_bike',
          'code': 'BIKE',
          'displayName': 'Bike',
          'description': 'Quickest single-rider bike trip',
          'capacity': 1,
          'etaMinutes': 2,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 7500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 2500, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 3800, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 375, 'currency': 'INR'},
          'total': {'amountMinor': 7875, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_bike_lite_1',
        'rideCategory': {
          'id': 'cat_bike_lite',
          'code': 'BIKE_LITE',
          'displayName': 'Bike lite',
          'description': 'Budget-friendly quick bike ride',
          'capacity': 1,
          'etaMinutes': 3,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 5800, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 2000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 2600, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 290, 'currency': 'INR'},
          'total': {'amountMinor': 6090, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_auto_1',
        'rideCategory': {
          'id': 'cat_auto',
          'code': 'AUTO',
          'displayName': 'Auto',
          'description': 'Doorstep 3-seater auto rickshaw',
          'capacity': 3,
          'etaMinutes': 4,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 10000, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 3500, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 5300, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 500, 'currency': 'INR'},
          'total': {'amountMinor': 10500, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_auto_lite_1',
        'rideCategory': {
          'id': 'cat_auto_lite',
          'code': 'AUTO_LITE',
          'displayName': 'Auto lite',
          'description': 'Economical pocket-friendly auto',
          'capacity': 3,
          'etaMinutes': 5,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 8200, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 2800, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 4200, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 410, 'currency': 'INR'},
          'total': {'amountMinor': 8610, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_cab_1',
        'rideCategory': {
          'id': 'cat_cab',
          'code': 'CAB',
          'displayName': 'Cab',
          'description': 'Comfortable hatchback AC cab',
          'capacity': 4,
          'etaMinutes': 3,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 13500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 5000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 7300, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 675, 'currency': 'INR'},
          'total': {'amountMinor': 14175, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_cab_lite_1',
        'rideCategory': {
          'id': 'cat_cab_lite',
          'code': 'CAB_LITE',
          'displayName': 'Cab lite',
          'description': 'Low fare everyday hatchback ride',
          'capacity': 4,
          'etaMinutes': 4,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 11200, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 4200, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 5800, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 560, 'currency': 'INR'},
          'total': {'amountMinor': 11760, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_prime_sedan_1',
        'rideCategory': {
          'id': 'cat_prime_sedan',
          'code': 'PRIME_SEDAN',
          'displayName': 'Prime sedan',
          'description': 'Top-rated spacious sedan (Dzire, Etios)',
          'capacity': 4,
          'etaMinutes': 3,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 18000, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 7500, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 9300, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 900, 'currency': 'INR'},
          'total': {'amountMinor': 18900, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
      Quote.fromJson({
        'quoteId': 'quote_7_seater_1',
        'rideCategory': {
          'id': 'cat_7_seater',
          'code': 'SEVEN_SEATER',
          'displayName': '7 seter',
          'description': 'Spacious 7-seater SUV (Ertiga, Innova)',
          'capacity': 7,
          'etaMinutes': 5,
        },
        'distanceMeters': distanceMeters,
        'durationSeconds': durationSeconds,
        'fareBreakdown': {
          'subtotal': {'amountMinor': 24500, 'currency': 'INR'},
          'components': [
            {'type': 'BASE_FARE', 'label': 'Base Fare', 'amount': {'amountMinor': 11000, 'currency': 'INR'}},
            {'type': 'DISTANCE_FARE', 'label': 'Distance Fare', 'amount': {'amountMinor': 12300, 'currency': 'INR'}},
            {'type': 'BOOKING_FEE', 'label': 'Platform Fee', 'amount': {'amountMinor': 1200, 'currency': 'INR'}},
          ],
          'discount': {'amountMinor': 0, 'currency': 'INR'},
          'tax': {'amountMinor': 1225, 'currency': 'INR'},
          'total': {'amountMinor': 25725, 'currency': 'INR'},
        },
        'pricingVersion': 'v1.0.0',
        'createdAt': now.toIso8601String(),
        'expiresAt': expires.toIso8601String(),
      }),
    ];

    for (final q in list) {
      _cachedQuotes[q.quoteId] = q;
    }

    return list;
  }

  @override
  Future<Quote> getQuote(String quoteId) async {
    final quote = _cachedQuotes[quoteId];
    if (quote != null) return quote;
    throw Exception('Quote not found');
  }

  @override
  Future<Quote> applyPromo(String quoteId, String promoCode) async {
    final quote = _cachedQuotes[quoteId];
    if (quote == null) throw Exception('Quote not found');

    int discountMinor = 0;
    final code = promoCode.trim().toUpperCase();
    if (code == 'GORUSH50') {
      discountMinor = 5000;
    } else if (code == 'WELCOME20') {
      discountMinor = 2000;
    } else if (code == 'FIRST100') {
      discountMinor = 10000;
    } else {
      throw Exception('Invalid promo code');
    }

    final currentTotal = quote.fareBreakdown.total.amountMinor;
    final newDiscount = discountMinor > currentTotal ? currentTotal : discountMinor;
    final newTotal = currentTotal - newDiscount;

    final updated = Quote(
      quoteId: quote.quoteId,
      rideCategory: quote.rideCategory,
      distanceMeters: quote.distanceMeters,
      durationSeconds: quote.durationSeconds,
      fareBreakdown: FareBreakdown(
        subtotal: quote.fareBreakdown.subtotal,
        components: quote.fareBreakdown.components,
        discount: Money(amountMinor: newDiscount, currency: 'INR'),
        tax: quote.fareBreakdown.tax,
        total: Money(amountMinor: newTotal, currency: 'INR'),
      ),
      pricingVersion: quote.pricingVersion,
      createdAt: quote.createdAt,
      expiresAt: quote.expiresAt,
    );

    _cachedQuotes[quoteId] = updated;
    return updated;
  }
}
