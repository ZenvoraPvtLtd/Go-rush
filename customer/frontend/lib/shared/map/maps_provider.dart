import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../core/location/domain/location_models.dart';

abstract class MapsProvider {
  Widget buildMap();
  void onMapCreated(dynamic controller);
  void moveCamera(GeoCoordinate coordinate, {double zoom = 14});
  void animateCamera(GeoCoordinate coordinate, {double zoom = 14});
  void setMarkers(List<GeoCoordinate> coordinates);
  void setRoutePolyline(List<GeoCoordinate> points);
  void clearMap();
  void dispose();
}

class GoogleMapsProviderImpl implements MapsProvider {
  GoogleMapController? _controller;
  Set<Marker> _markers = {};
  Set<Polyline> _polylines = {};
  final StreamController<void> _updateController = StreamController.broadcast();

  @override
  Widget buildMap() {
    return StreamBuilder<void>(
      stream: _updateController.stream,
      builder: (context, _) {
        return GoogleMap(
          initialCameraPosition: const CameraPosition(
            target: LatLng(12.9716, 77.5946), // Default Bangalore
            zoom: 14,
          ),
          onMapCreated: onMapCreated,
          markers: _markers,
          polylines: _polylines,
          myLocationEnabled: true,
          myLocationButtonEnabled: false,
          zoomControlsEnabled: false,
          compassEnabled: false,
          mapToolbarEnabled: false,
        );
      },
    );
  }

  @override
  void onMapCreated(dynamic controller) {
    _controller = controller as GoogleMapController;
  }

  @override
  void moveCamera(GeoCoordinate coordinate, {double zoom = 14}) {
    _controller?.moveCamera(CameraUpdate.newLatLngZoom(
      LatLng(coordinate.latitude, coordinate.longitude),
      zoom,
    ));
  }

  @override
  void animateCamera(GeoCoordinate coordinate, {double zoom = 14}) {
    _controller?.animateCamera(CameraUpdate.newLatLngZoom(
      LatLng(coordinate.latitude, coordinate.longitude),
      zoom,
    ));
  }

  @override
  void setMarkers(List<GeoCoordinate> coordinates) {
    _markers = coordinates.asMap().entries.map((entry) {
      return Marker(
        markerId: MarkerId('marker_${entry.key}'),
        position: LatLng(entry.value.latitude, entry.value.longitude),
      );
    }).toSet();
    _updateController.add(null);
  }

  @override
  void setRoutePolyline(List<GeoCoordinate> points) {
    _polylines = {
      Polyline(
        polylineId: const PolylineId('route_1'),
        color: Colors.blue,
        width: 4,
        points: points.map((p) => LatLng(p.latitude, p.longitude)).toList(),
      )
    };
    _updateController.add(null);
  }

  @override
  void clearMap() {
    _markers.clear();
    _polylines.clear();
    _updateController.add(null);
  }

  @override
  void dispose() {
    _updateController.close();
    _controller?.dispose();
  }
}
