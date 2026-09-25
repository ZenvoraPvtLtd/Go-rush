import 'money.dart';
import 'ride_category.dart';

class FareComponent {
  final String type;
  final String label;
  final Money amount;

  const FareComponent({
    required this.type,
    required this.label,
    required this.amount,
  });

  factory FareComponent.fromJson(Map<String, dynamic> json) {
    return FareComponent(
      type: json['type'] as String,
      label: json['label'] as String,
      amount: Money.fromJson(json['amount'] as Map<String, dynamic>),
    );
  }
}

class FareBreakdown {
  final Money subtotal;
  final List<FareComponent> components;
  final Money discount;
  final Money tax;
  final Money total;

  const FareBreakdown({
    required this.subtotal,
    required this.components,
    required this.discount,
    required this.tax,
    required this.total,
  });

  factory FareBreakdown.fromJson(Map<String, dynamic> json) {
    return FareBreakdown(
      subtotal: Money.fromJson(json['subtotal'] as Map<String, dynamic>),
      components: (json['components'] as List)
          .map((e) => FareComponent.fromJson(e as Map<String, dynamic>))
          .toList(),
      discount: Money.fromJson(json['discount'] as Map<String, dynamic>),
      tax: Money.fromJson(json['tax'] as Map<String, dynamic>),
      total: Money.fromJson(json['total'] as Map<String, dynamic>),
    );
  }
}

class Quote {
  final String quoteId;
  final RideCategory rideCategory;
  final int distanceMeters;
  final int durationSeconds;
  final FareBreakdown fareBreakdown;
  final String pricingVersion;
  final DateTime createdAt;
  final DateTime expiresAt;

  const Quote({
    required this.quoteId,
    required this.rideCategory,
    required this.distanceMeters,
    required this.durationSeconds,
    required this.fareBreakdown,
    required this.pricingVersion,
    required this.createdAt,
    required this.expiresAt,
  });

  bool get isExpired => DateTime.now().isAfter(expiresAt);

  factory Quote.fromJson(Map<String, dynamic> json) {
    return Quote(
      quoteId: json['quoteId'] as String,
      rideCategory: RideCategory.fromJson(json['rideCategory'] as Map<String, dynamic>),
      distanceMeters: json['distanceMeters'] as int,
      durationSeconds: json['durationSeconds'] as int,
      fareBreakdown: FareBreakdown.fromJson(json['fareBreakdown'] as Map<String, dynamic>),
      pricingVersion: json['pricingVersion'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      expiresAt: DateTime.parse(json['expiresAt'] as String),
    );
  }
}
