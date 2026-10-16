import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import '../core/theme.dart';
import '../services/location_service.dart';

/// Reusable Google Map widget with runtime location permission handling,
/// GPS check, real device position streaming, and error handling.
class GoRushGoogleMapView extends StatefulWidget {
  final double height;
  final LatLng? initialCenter;
  final double initialZoom;
  final Set<Marker>? markers;
  final Set<Polyline>? polylines;
  final bool showMyLocationButton;
  final String? title;

  const GoRushGoogleMapView({
    super.key,
    this.height = 220,
    this.initialCenter,
    this.initialZoom = 14.5,
    this.markers,
    this.polylines,
    this.showMyLocationButton = true,
    this.title,
  });

  @override
  State<GoRushGoogleMapView> createState() => _GoRushGoogleMapViewState();
}

class _GoRushGoogleMapViewState extends State<GoRushGoogleMapView> {
  GoogleMapController? _mapController;
  Position? _currentPosition;
  bool _isGpsEnabled = true;
  bool _hasPermission = false;
  bool _isLoading = true;
  String? _errorMessage;
  StreamSubscription<Position>? _positionSubscription;

  @override
  void initState() {
    super.initState();
    _checkPermissionsAndGetLocation();
  }

  @override
  void dispose() {
    _positionSubscription?.cancel();
    _mapController?.dispose();
    super.dispose();
  }

  Future<void> _checkPermissionsAndGetLocation() async {
    if (!mounted) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final gpsEnabled = await Geolocator.isLocationServiceEnabled();
      if (!gpsEnabled) {
        if (mounted) {
          setState(() {
            _isGpsEnabled = false;
            _isLoading = false;
          });
        }
        return;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }

      if (permission == LocationPermission.denied ||
          permission == LocationPermission.deniedForever) {
        if (mounted) {
          setState(() {
            _hasPermission = false;
            _isGpsEnabled = true;
            _isLoading = false;
          });
        }
        return;
      }

      // Permission granted
      final pos = await LocationService.instance.currentPosition();

      if (mounted) {
        setState(() {
          _isGpsEnabled = true;
          _hasPermission = true;
          _currentPosition = pos;
          _isLoading = false;
        });
      }

      if (pos != null && _mapController != null) {
        _mapController!.animateCamera(
          CameraUpdate.newLatLng(LatLng(pos.latitude, pos.longitude)),
        );
      }

      // Listen for continuous location updates when driver is active
      _positionSubscription = LocationService.instance.activeRidePositions().listen(
        (position) {
          if (!mounted) return;
          setState(() => _currentPosition = position);
          _mapController?.animateCamera(
            CameraUpdate.newLatLng(LatLng(position.latitude, position.longitude)),
          );
        },
        onError: (err) {
          debugPrint('[GoogleMapWidget] Location stream error: $err');
        },
      );
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = 'Unable to fetch current location: $e';
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final defaultLatLng = widget.initialCenter ??
        (_currentPosition != null
            ? LatLng(_currentPosition!.latitude, _currentPosition!.longitude)
            : const LatLng(28.6270, 77.3680));

    final effectiveMarkers = Set<Marker>.from(widget.markers ?? {});
    if (_currentPosition != null && widget.markers == null) {
      effectiveMarkers.add(
        Marker(
          markerId: const MarkerId('driver_live_location'),
          position: LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
          infoWindow: const InfoWindow(title: 'Your Location'),
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueAzure),
        ),
      );
    }

    return SizedBox(
      height: widget.height,
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Stack(
          children: [
            GoogleMap(
              initialCameraPosition: CameraPosition(
                target: defaultLatLng,
                zoom: widget.initialZoom,
              ),
              myLocationEnabled: _hasPermission,
              myLocationButtonEnabled: widget.showMyLocationButton && _hasPermission,
              zoomControlsEnabled: false,
              markers: effectiveMarkers,
              polylines: widget.polylines ?? {},
              onMapCreated: (controller) {
                _mapController = controller;
                if (_currentPosition != null) {
                  controller.animateCamera(
                    CameraUpdate.newLatLng(
                      LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
                    ),
                  );
                }
              },
            ),

            if (widget.title != null)
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.12),
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.my_location_rounded,
                          color: QuickServeColors.primaryBlue, size: 14),
                      const SizedBox(width: 4),
                      Text(
                        widget.title!,
                        style: const TextStyle(
                          color: QuickServeColors.textDark,
                          fontSize: 11.5,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

            if (!_isGpsEnabled)
              _buildOverlayBanner(
                icon: Icons.location_off_rounded,
                color: const Color(0xFFF59E0B),
                title: 'GPS Service Disabled',
                subtitle:
                    'Please enable location services on your device to see your live position.',
                actionLabel: 'Check Location Status',
                onAction: _checkPermissionsAndGetLocation,
              ),

            if (_isGpsEnabled && !_hasPermission && !_isLoading)
              _buildOverlayBanner(
                icon: Icons.security_rounded,
                color: const Color(0xFFEF4444),
                title: 'Location Permission Required',
                subtitle:
                    'GoRush Captain requires location access to display driver map & receive nearby ride offers.',
                actionLabel: 'Grant Permission',
                onAction: _checkPermissionsAndGetLocation,
              ),

            if (_errorMessage != null)
              _buildOverlayBanner(
                icon: Icons.error_outline_rounded,
                color: const Color(0xFFEF4444),
                title: 'Map Loading Error',
                subtitle: _errorMessage!,
                actionLabel: 'Retry Map Load',
                onAction: _checkPermissionsAndGetLocation,
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildOverlayBanner({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required String actionLabel,
    required VoidCallback onAction,
  }) {
    return Container(
      color: Colors.black.withOpacity(0.72),
      padding: const EdgeInsets.all(16),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 36),
            const SizedBox(height: 8),
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: const TextStyle(color: Colors.white70, fontSize: 11.5),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: onAction,
              style: ElevatedButton.styleFrom(
                backgroundColor: color,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: Text(
                actionLabel,
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
