import 'dart:async';
import 'package:flutter/foundation.dart';
import '../domain/driver_location.dart';

abstract class RealtimeService {
  Future<void> connect(String token);
  Future<void> disconnect();
  
  /// Subscribes to a ride channel. Throws if the backend rejects authorization.
  Future<void> subscribeToRide(String rideId);
  Future<void> unsubscribeFromRide(String rideId);

  Stream<DriverLocation> get driverLocationStream;
}

class MockRealtimeService implements RealtimeService {
  final _locationController = StreamController<DriverLocation>.broadcast();
  Timer? _mockLocationTimer;
  String? _activeRideId;
  int _sequence = 0;
  
  // Starting coordinates for our mock driver
  double _currentLat = 22.7196;
  double _currentLng = 75.8577;

  @override
  Future<void> connect(String token) async {
    // In prod: WebSocket.connect()
    await Future.delayed(const Duration(milliseconds: 200));
  }

  @override
  Future<void> disconnect() async {
    _mockLocationTimer?.cancel();
    _locationController.close();
  }

  @override
  Future<void> subscribeToRide(String rideId) async {
    _activeRideId = rideId;
    _sequence = 0;
    
    // Safety check: Never run fake movement logic in production builds
    if (kDebugMode) {
      _mockLocationTimer?.cancel();
      _mockLocationTimer = Timer.periodic(const Duration(seconds: 2), (timer) {
        if (_activeRideId == null) {
          timer.cancel();
          return;
        }
        
        // Move driver slightly
        _currentLat += 0.0001; 
        _currentLng += 0.0001;
        _sequence++;
        
        final location = DriverLocation(
          driverId: 'drv_1',
          rideId: _activeRideId!,
          latitude: _currentLat,
          longitude: _currentLng,
          accuracy: 10.0,
          heading: 45.0,
          timestamp: DateTime.now(),
          sequenceNumber: _sequence,
        );
        
        _locationController.add(location);
      });
    }
  }

  @override
  Future<void> unsubscribeFromRide(String rideId) async {
    if (_activeRideId == rideId) {
      _mockLocationTimer?.cancel();
      _activeRideId = null;
    }
  }

  @override
  Stream<DriverLocation> get driverLocationStream => _locationController.stream;
}
