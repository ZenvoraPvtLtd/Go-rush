import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart' hide Path;
import '../services/location_service.dart';
import 'theme.dart';

class LightMapView extends StatefulWidget {
  final String locationTitle;
  final double height;
  final bool showDestination;

  const LightMapView({
    super.key,
    this.locationTitle = 'Sector 62, Noida',
    this.height = 180,
    this.showDestination = false,
  });

  @override
  State<LightMapView> createState() => _LightMapViewState();
}

class _LightMapViewState extends State<LightMapView>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: widget.height,
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Stack(
          fit: StackFit.expand,
          children: [
            AnimatedBuilder(
              animation: _pulseController,
              builder: (context, _) {
                return CustomPaint(
                  painter: _LightMapPainter(
                      pulse: _pulseController.value,
                      showRoute: widget.showDestination),
                );
              },
            ),
            // Current Location Pin Card
            Center(
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                        color: Colors.black.withOpacity(0.12),
                        blurRadius: 10,
                        offset: const Offset(0, 2)),
                  ],
                  border: Border.all(color: QuickServeColors.borderLight),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.location_on,
                        color: QuickServeColors.primaryOrange, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      widget.locationTitle,
                      style: const TextStyle(
                          color: QuickServeColors.textDark,
                          fontSize: 12,
                          fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class LightNavigationMapView extends StatefulWidget {
  final double progress;
  const LightNavigationMapView({super.key, this.progress = 0.5});

  @override
  State<LightNavigationMapView> createState() => _LightNavigationMapViewState();
}

class _LightNavigationMapViewState extends State<LightNavigationMapView> {
  static const _fallbackLocation = LatLng(28.6139, 77.2090);
  final MapController _mapController = MapController();
  StreamSubscription<Position>? _locationSubscription;
  LatLng? _driverLocation;

  @override
  void initState() {
    super.initState();
    _startLocationTracking();
  }

  Future<void> _startLocationTracking() async {
    final currentPosition = await LocationService.instance.currentPosition();
    if (!mounted || currentPosition == null) return;

    _updateDriverLocation(currentPosition);
    _locationSubscription =
        LocationService.instance.activeRidePositions().listen(
              _updateDriverLocation,
              onError: (_) {},
            );
  }

  void _updateDriverLocation(Position position) {
    final location = LatLng(position.latitude, position.longitude);
    if (!mounted) return;
    setState(() => _driverLocation = location);
    _mapController.move(location, 16);
  }

  @override
  void dispose() {
    _locationSubscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final location = _driverLocation ?? _fallbackLocation;
    return FlutterMap(
      mapController: _mapController,
      options: MapOptions(initialCenter: location, initialZoom: 13),
      children: [
        TileLayer(
          urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          userAgentPackageName: 'com.gorush.driver',
          maxNativeZoom: 19,
        ),
        if (_driverLocation != null)
          MarkerLayer(
            markers: [
              Marker(
                point: _driverLocation!,
                width: 52,
                height: 52,
                child: Container(
                  decoration: BoxDecoration(
                    color: QuickServeColors.primaryBlue,
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 3),
                    boxShadow: const [
                      BoxShadow(color: Colors.black26, blurRadius: 6)
                    ],
                  ),
                  child: const Icon(Icons.directions_car_rounded,
                      color: Colors.white, size: 27),
                ),
              ),
            ],
          ),
        const RichAttributionWidget(
          attributions: [TextSourceAttribution('© OpenStreetMap contributors')],
        ),
      ],
    );
  }
}

class _LightMapPainter extends CustomPainter {
  final double pulse;
  final bool showRoute;

  _LightMapPainter({required this.pulse, required this.showRoute});

  @override
  void paint(Canvas canvas, Size size) {
    // Base land color matching light map
    final bgPaint = Paint()..color = const Color(0xFFF3F2EE);
    canvas.drawRect(Offset.zero & size, bgPaint);

    // Parks / Green spaces
    final parkPaint = Paint()..color = const Color(0xFFE8F3E8);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
          Rect.fromLTWH(size.width * 0.1, size.height * 0.15, size.width * 0.28,
              size.height * 0.4),
          const Radius.circular(8)),
      parkPaint,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
          Rect.fromLTWH(size.width * 0.65, size.height * 0.45, size.width * 0.3,
              size.height * 0.45),
          const Radius.circular(8)),
      parkPaint,
    );

    // Minor roads
    final roadPaint = Paint()
      ..color = Colors.white
      ..strokeWidth = 6.0
      ..style = PaintingStyle.stroke;

    final roadBorderPaint = Paint()
      ..color = const Color(0xFFE5E3DB)
      ..strokeWidth = 8.0
      ..style = PaintingStyle.stroke;

    // Grid roads
    final roads = [
      Offset(0, size.height * 0.35) & Size(size.width, 0),
      Offset(0, size.height * 0.68) & Size(size.width, 0),
      Offset(size.width * 0.28, 0) & Size(0, size.height),
      Offset(size.width * 0.62, 0) & Size(0, size.height),
    ];

    for (final r in roads) {
      canvas.drawLine(r.topLeft, r.bottomRight, roadBorderPaint);
      canvas.drawLine(r.topLeft, r.bottomRight, roadPaint);
    }

    // Diagonal arterial avenue
    final avenuePath = Path();
    avenuePath.moveTo(0, size.height * 0.85);
    avenuePath.quadraticBezierTo(
        size.width * 0.45, size.height * 0.5, size.width, size.height * 0.2);

    final avenueBorder = Paint()
      ..color = const Color(0xFFE0DDD2)
      ..strokeWidth = 12.0
      ..style = PaintingStyle.stroke;
    final avenueFill = Paint()
      ..color = Colors.white
      ..strokeWidth = 9.0
      ..style = PaintingStyle.stroke;

    canvas.drawPath(avenuePath, avenueBorder);
    canvas.drawPath(avenuePath, avenueFill);

    // Pulse circle at center
    final pulsePaint = Paint()
      ..color = QuickServeColors.primaryOrange.withOpacity((1.0 - pulse) * 0.3)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(size.width * 0.5, size.height * 0.5),
        18 + (pulse * 24), pulsePaint);
  }

  @override
  bool shouldRepaint(covariant _LightMapPainter oldDelegate) => true;
}



// Backward compatibility aliases
class DarkRadarMapView extends LightMapView {
  const DarkRadarMapView({
    super.key,
    super.locationTitle = 'Sector 62, Noida',
    super.height = 180,
    super.showDestination = false,
    String? locationHindi,
    bool? showSurgeBadge,
  });
}

class DarkNavigationMapView extends LightNavigationMapView {
  const DarkNavigationMapView({super.key, super.progress = 0.5});
}
