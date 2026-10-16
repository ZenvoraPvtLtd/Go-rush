import 'package:flutter/material.dart';
import '../widgets/google_map_widget.dart';

class LightMapView extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return GoRushGoogleMapView(
      height: height,
      title: locationTitle,
      showMyLocationButton: true,
    );
  }
}

class LightNavigationMapView extends StatelessWidget {
  final double progress;
  const LightNavigationMapView({super.key, this.progress = 0.5});

  @override
  Widget build(BuildContext context) {
    return const GoRushGoogleMapView(
      height: double.infinity,
      showMyLocationButton: true,
      initialZoom: 15.5,
    );
  }
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
