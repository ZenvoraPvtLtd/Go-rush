import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../../../core/ride/domain/ride_models.dart';
import '../../../core/ride/data/ride_repository.dart';
import '../../../core/realtime/application/realtime_service.dart';
import '../../../core/realtime/domain/driver_location.dart';
import '../../../shared/theme/gorush_colors.dart';
import '../../../shared/theme/gorush_typography.dart';
import '../../../shared/theme/gorush_spacing.dart';

class RideStatusScreen extends StatefulWidget {
  final Ride initialRide;
  final RideRepository repository;
  final RealtimeService realtimeService;

  const RideStatusScreen({
    Key? key,
    required this.initialRide,
    required this.repository,
    required this.realtimeService,
  }) : super(key: key);

  @override
  State<RideStatusScreen> createState() => _RideStatusScreenState();
}

class _RideStatusScreenState extends State<RideStatusScreen> {
  late Ride _ride;
  bool _isCancelling = false;
  Timer? _mockDispatchTimer;
  StreamSubscription<DriverLocation>? _locationSub;
  DriverLocation? _latestLocation;
  int _etaMinutes = 5;

  @override
  void initState() {
    super.initState();
    _ride = widget.initialRide;
    
    // MOCK REALTIME EVENT: Simulate receiving a DriverAssigned event after 4 seconds
    if (_ride.status == RideStatus.searching) {
      if (kDebugMode) {
        _mockDispatchTimer = Timer(const Duration(seconds: 4), () {
          if (mounted) {
            setState(() {
              _ride = Ride(
                rideId: _ride.rideId,
                customerId: _ride.customerId,
                status: RideStatus.driverAssigned,
                quoteSnapshot: _ride.quoteSnapshot,
                createdAt: _ride.createdAt,
                updatedAt: DateTime.now(),
              );
            });
            _startLiveTracking();
          }
        });
      }
    } else if (_ride.status == RideStatus.driverAssigned || _ride.status == RideStatus.driverEnRoute) {
      _startLiveTracking();
    }
  }

  void _startLiveTracking() {
    widget.realtimeService.connect('mock_token');
    widget.realtimeService.subscribeToRide(_ride.rideId);
    
    _locationSub = widget.realtimeService.driverLocationStream.listen((location) {
      if (mounted) {
        setState(() {
          _latestLocation = location;
          // In prod: pass location to RoutingETAService
          if (_etaMinutes > 1) {
             // Artificial ETA decrement based on sequence
             if (location.sequenceNumber % 3 == 0) _etaMinutes--;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _mockDispatchTimer?.cancel();
    _locationSub?.cancel();
    widget.realtimeService.unsubscribeFromRide(_ride.rideId);
    widget.realtimeService.disconnect();
    super.dispose();
  }

  Future<void> _cancelRide() async {
    setState(() => _isCancelling = true);
    try {
      final updatedRide = await widget.repository.cancelRide(
        rideId: _ride.rideId,
        reason: 'CUSTOMER_CHANGED_MIND',
      );
      setState(() {
        _ride = updatedRide;
      });
      _locationSub?.cancel();
      widget.realtimeService.unsubscribeFromRide(_ride.rideId);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to cancel: $e')),
      );
    } finally {
      if (mounted) setState(() => _isCancelling = false);
    }
  }

  String _getStatusText(RideStatus status) {
    switch (status) {
      case RideStatus.requested:
        return 'Booking your ride...';
      case RideStatus.searching:
        return 'Finding the best driver for you...';
      case RideStatus.driverAssigned:
        return 'Driver is assigned';
      case RideStatus.driverEnRoute:
        return 'Driver is on the way';
      case RideStatus.driverArrived:
        return 'Driver has arrived';
      case RideStatus.rideStarted:
      case RideStatus.rideInProgress:
        return 'You are on your way';
      case RideStatus.rideCompleted:
        return 'Ride completed';
      case RideStatus.cancelled:
        return 'Ride cancelled';
      case RideStatus.noDriver:
        return 'No driver available';
      default:
        return 'Updating...';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GoRushColors.background,
      appBar: AppBar(
        title: const Text('Your Ride'),
        backgroundColor: GoRushColors.surface,
        foregroundColor: GoRushColors.onSurface,
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (_ride.status == RideStatus.searching) ...[
                    const CircularProgressIndicator(),
                    const SizedBox(height: GoRushSpacing.xl),
                  ],
                  if (_ride.status == RideStatus.driverAssigned) ...[
                    const Icon(Icons.check_circle, color: GoRushColors.primary, size: 64),
                    const SizedBox(height: GoRushSpacing.md),
                  ],
                  Text(
                    _getStatusText(_ride.status),
                    style: GoRushTypography.h2,
                    textAlign: TextAlign.center,
                  ),
                  if (_latestLocation != null) ...[
                    const SizedBox(height: GoRushSpacing.lg),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: GoRushColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
                      child: Text(
                        'Live: [${_latestLocation!.latitude.toStringAsFixed(4)}, ${_latestLocation!.longitude.toStringAsFixed(4)}] Seq: ${_latestLocation!.sequenceNumber}',
                        style: GoRushTypography.body2.copyWith(fontFamily: 'monospace', color: GoRushColors.primary),
                      ),
                    )
                  ]
                ],
              ),
            ),
          ),
          
          if (_ride.status == RideStatus.driverAssigned)
             Container(
               margin: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: GoRushSpacing.md),
               padding: const EdgeInsets.all(GoRushSpacing.md),
               decoration: BoxDecoration(
                 color: GoRushColors.primaryContainer,
                 borderRadius: BorderRadius.circular(16),
               ),
               child: Row(
                 children: [
                   CircleAvatar(
                     backgroundColor: GoRushColors.primary,
                     child: Text('R', style: GoRushTypography.body1.copyWith(color: GoRushColors.onPrimary)),
                   ),
                   const SizedBox(width: GoRushSpacing.md),
                   Expanded(
                     child: Column(
                       crossAxisAlignment: CrossAxisAlignment.start,
                       children: [
                         Text('Ramesh K.', style: GoRushTypography.h3),
                         Text('Maruti Dzire • MP09 AB 1234', style: GoRushTypography.body2),
                       ],
                     ),
                   ),
                   Column(
                     children: [
                       Text('4.8 ⭐', style: GoRushTypography.body1),
                       Text('$_etaMinutes mins', style: GoRushTypography.h4.copyWith(color: GoRushColors.primary)),
                     ]
                   )
                 ],
               ),
             ),

          Container(
            padding: const EdgeInsets.all(GoRushSpacing.xl),
            decoration: const BoxDecoration(
              color: GoRushColors.surface,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -2))
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      _ride.quoteSnapshot.rideCategory.displayName,
                      style: GoRushTypography.h3,
                    ),
                    Text(
                      _ride.quoteSnapshot.fareBreakdown.total.formatted,
                      style: GoRushTypography.h3,
                    ),
                  ],
                ),
                const SizedBox(height: GoRushSpacing.md),
                // Pseudo Pickup / Destination Map Simulation
                Row(
                  children: [
                    const Icon(Icons.circle, size: 12, color: GoRushColors.primary),
                    const SizedBox(width: GoRushSpacing.sm),
                    Text('Current Location', style: GoRushTypography.body1),
                  ],
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 5.0),
                  child: SizedBox(height: 20, child: VerticalDivider(color: Colors.grey)),
                ),
                Row(
                  children: [
                    const Icon(Icons.location_on, size: 12, color: GoRushColors.error),
                    const SizedBox(width: GoRushSpacing.sm),
                    Text('Destination', style: GoRushTypography.body1),
                  ],
                ),
                const SizedBox(height: GoRushSpacing.xl),
                if (_ride.status == RideStatus.searching || _ride.status == RideStatus.requested)
                  ElevatedButton(
                    onPressed: _isCancelling ? null : _cancelRide,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: GoRushColors.error,
                      foregroundColor: GoRushColors.surface,
                      padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.md),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: _isCancelling
                        ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white))
                        : Text('Cancel Ride', style: GoRushTypography.button),
                  ),
                if (_ride.status == RideStatus.cancelled || _ride.status == RideStatus.noDriver)
                  ElevatedButton(
                    onPressed: () => Navigator.of(context).pop(), // Go back home
                    style: ElevatedButton.styleFrom(
                      backgroundColor: GoRushColors.primary,
                      foregroundColor: GoRushColors.onPrimary,
                      padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.md),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Text('Done', style: GoRushTypography.button),
                  ),
              ],
            ),
          )
        ],
      ),
      floatingActionButton: (_ride.status == RideStatus.driverAssigned || _ride.status == RideStatus.driverEnRoute || _ride.status == RideStatus.rideStarted || _ride.status == RideStatus.rideInProgress) ? FloatingActionButton.extended(
        onPressed: () {
          // Navigate to Safety Screen
          import('../../safety/presentation/safety_screen.dart').then((module) {
             Navigator.push(context, MaterialPageRoute(builder: (_) => module.SafetyScreen(rideId: _ride.rideId)));
          });
        },
        backgroundColor: GoRushColors.primary,
        icon: const Icon(Icons.shield, color: Colors.white),
        label: const Text('Safety', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ) : null,
    );
  }
}
