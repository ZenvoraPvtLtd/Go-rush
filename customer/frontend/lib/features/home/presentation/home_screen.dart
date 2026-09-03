import 'package:flutter/material.dart';
import '../../../shared/theme/colors.dart';
import '../../../shared/theme/tokens.dart';
import '../../../shared/theme/typography.dart';
import '../../../shared/widgets/inputs/gorush_search_field.dart';
import '../../../shared/widgets/map/gorush_location_pill.dart';
import '../../quote/presentation/widgets/gorush_ride_category_card.dart';

import '../../../shared/map/maps_provider.dart';
import '../../../core/location/location_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GoogleMapsProviderImpl _mapsProvider = GoogleMapsProviderImpl();
  final LocationServiceImpl _locationService = LocationServiceImpl();
  bool _isLoadingLocation = false;

  @override
  void dispose() {
    _mapsProvider.dispose();
    super.dispose();
  }

  Future<void> _requestCurrentLocation() async {
    setState(() => _isLoadingLocation = true);
    try {
      final position = await _locationService.getCurrentPosition();
      _mapsProvider.animateCamera(position.coordinate, zoom: 16);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Unable to get location: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoadingLocation = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Real Map Background
          SizedBox.expand(
            child: _mapsProvider.buildMap(),
          ),
          
          // Top Bar (Profile + Notifications)
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: GoRushSpacing.sm),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      color: GoRushColors.surface,
                      shape: BoxShape.circle,
                    ),
                    padding: const EdgeInsets.all(GoRushSpacing.sm),
                    child: const Icon(Icons.person, color: GoRushColors.textPrimary),
                  ),
                  Container(
                    decoration: const BoxDecoration(
                      color: GoRushColors.surface,
                      shape: BoxShape.circle,
                    ),
                    padding: const EdgeInsets.all(GoRushSpacing.sm),
                    child: const Icon(Icons.notifications_none, color: GoRushColors.textPrimary),
                  ),
                ],
              ),
            ),
          ),

          // Current Location Pill
          Positioned(
            bottom: 340,
            right: GoRushSpacing.md,
            child: _isLoadingLocation
                ? const CircularProgressIndicator()
                : GoRushLocationPill(
                    onTap: _requestCurrentLocation,
                  ),
          ),

          // Bottom Sheet Content
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              decoration: const BoxDecoration(
                color: GoRushColors.surface,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(GoRushRadius.lg),
                  topRight: Radius.circular(GoRushRadius.lg),
                ),
                boxShadow: [
                  BoxShadow(
                    color: GoRushColors.border,
                    offset: Offset(0, -2),
                    blurRadius: 12,
                  )
                ],
              ),
              padding: const EdgeInsets.all(GoRushSpacing.lg),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Where are you going?', style: GoRushTypography.headline),
                  const SizedBox(height: GoRushSpacing.md),
                  GoRushSearchField(
                    hintText: 'Search destination',
                    readOnly: true,
                    onTap: () {
                      // Future: Navigate to search screen
                    },
                  ),
                  const SizedBox(height: GoRushSpacing.lg),
                  Text('Ride Categories', style: GoRushTypography.title),
                  const SizedBox(height: GoRushSpacing.md),
                  GoRushRideCategoryCard(
                    title: 'Auto',
                    capacity: '3',
                    eta: '2 min',
                    fare: '₹45',
                    isSelected: false,
                    onTap: () {},
                  ),
                  const SizedBox(height: GoRushSpacing.sm),
                  GoRushRideCategoryCard(
                    title: 'Mini',
                    capacity: '4',
                    eta: '5 min',
                    fare: '₹120',
                    isSelected: true,
                    onTap: () {},
                  ),
                  const SizedBox(height: GoRushSpacing.xl),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
