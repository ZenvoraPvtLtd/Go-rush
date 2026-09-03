import '../../pricing/domain/quote_models.dart';

enum RideStatus {
  requested,
  searching,
  driverAssigned,
  driverEnRoute,
  driverArrived,
  rideStarted,
  rideInProgress,
  rideCompleted,
  cancelled,
  noDriver,
  failed,
}

RideStatus _statusFromString(String status) {
  switch (status) {
    case 'REQUESTED': return RideStatus.requested;
    case 'SEARCHING': return RideStatus.searching;
    case 'DRIVER_ASSIGNED': return RideStatus.driverAssigned;
    case 'DRIVER_EN_ROUTE': return RideStatus.driverEnRoute;
    case 'DRIVER_ARRIVED': return RideStatus.driverArrived;
    case 'RIDE_STARTED': return RideStatus.rideStarted;
    case 'RIDE_IN_PROGRESS': return RideStatus.rideInProgress;
    case 'RIDE_COMPLETED': return RideStatus.rideCompleted;
    case 'CANCELLED': return RideStatus.cancelled;
    case 'NO_DRIVER': return RideStatus.noDriver;
    default: return RideStatus.failed;
  }
}

class Ride {
  final String rideId;
  final String customerId;
  final RideStatus status;
  final Quote quoteSnapshot;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? cancellationReason;

  const Ride({
    required this.rideId,
    required this.customerId,
    required this.status,
    required this.quoteSnapshot,
    required this.createdAt,
    required this.updatedAt,
    this.cancellationReason,
  });

  factory Ride.fromJson(Map<String, dynamic> json) {
    return Ride(
      rideId: json['rideId'] as String,
      customerId: json['customerId'] as String,
      status: _statusFromString(json['status'] as String),
      quoteSnapshot: Quote.fromJson(json['quoteSnapshot'] as Map<String, dynamic>),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      cancellationReason: json['cancellationReason'] as String?,
    );
  }
}
