enum RideCategoryType {
  bike,
  auto,
  miniSedan,
}

class RideCategory {
  final String id;
  final RideCategoryType code;
  final String displayName;
  final String description;
  final int capacity;

  const RideCategory({
    required this.id,
    required this.code,
    required this.displayName,
    required this.description,
    required this.capacity,
  });

  factory RideCategory.fromJson(Map<String, dynamic> json) {
    final codeStr = json['code'] as String;
    RideCategoryType code = RideCategoryType.miniSedan;
    if (codeStr == 'BIKE') code = RideCategoryType.bike;
    if (codeStr == 'AUTO') code = RideCategoryType.auto;

    return RideCategory(
      id: json['id'] as String,
      code: code,
      displayName: json['displayName'] as String,
      description: json['description'] as String,
      capacity: json['capacity'] as int,
    );
  }
}
