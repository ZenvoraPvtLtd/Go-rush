import 'dart:async';
import 'package:flutter/material.dart';
import '../../../core/pricing/domain/quote_models.dart';
import '../../../core/pricing/data/quote_repository.dart';
import '../../../core/ride/data/ride_repository.dart';
import '../../../shared/theme/gorush_colors.dart';
import '../../../shared/theme/gorush_typography.dart';
import '../../../shared/theme/gorush_spacing.dart';
import 'fare_breakdown_sheet.dart';
import '../../ride/presentation/ride_status_screen.dart';

class VehicleSelectionSheet extends StatefulWidget {
  final QuoteRepository quoteRepository;
  final RideRepository rideRepository;
  final VoidCallback onConfirm;

  const VehicleSelectionSheet({
    Key? key,
    required this.quoteRepository,
    required this.rideRepository,
    required this.onConfirm,
  }) : super(key: key);

  @override
  State<VehicleSelectionSheet> createState() => _VehicleSelectionSheetState();
}

class _VehicleSelectionSheetState extends State<VehicleSelectionSheet> {
  bool _isLoading = true;
  bool _isCreatingRide = false;
  String? _error;
  List<Quote> _quotes = [];
  Quote? _selectedQuote;
  Timer? _expiryTimer;
  bool _isExpired = false;

  @override
  void initState() {
    super.initState();
    _loadQuotes();
  }

  @override
  void dispose() {
    _expiryTimer?.cancel();
    super.dispose();
  }

  Future<void> _loadQuotes() async {
    setState(() {
      _isLoading = true;
      _error = null;
      _isExpired = false;
    });

    try {
      final quotes = await widget.quoteRepository.generateQuotes(
        distanceMeters: 5500, // mock route distance
        durationSeconds: 900,
        idempotencyKey: DateTime.now().millisecondsSinceEpoch.toString(),
      );

      if (mounted) {
        setState(() {
          _quotes = quotes;
          if (quotes.isNotEmpty) {
            _selectedQuote = quotes.first;
          }
          _isLoading = false;
        });
        _startExpiryTimer();
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _startExpiryTimer() {
    _expiryTimer?.cancel();
    if (_quotes.isEmpty) return;

    final expiresAt = _quotes.first.expiresAt;
    final timeToExpiry = expiresAt.difference(DateTime.now());

    if (timeToExpiry.isNegative) {
      setState(() => _isExpired = true);
    } else {
      _expiryTimer = Timer(timeToExpiry, () {
        if (mounted) {
          setState(() => _isExpired = true);
        }
      });
    }
  }

  void _showFareBreakdown(Quote quote) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => FareBreakdownSheet(quote: quote),
    );
  }
  
  Future<void> _confirmRide() async {
    if (_selectedQuote == null) return;
    
    setState(() => _isCreatingRide = true);
    
    try {
      final ride = await widget.rideRepository.createRide(
        quoteId: _selectedQuote!.quoteId,
        idempotencyKey: DateTime.now().millisecondsSinceEpoch.toString(),
      );
      
      if (mounted) {
        // Navigate to status screen
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => RideStatusScreen(
              initialRide: ride,
              repository: widget.rideRepository,
              realtimeService: MockRealtimeService(), // Injected
            ),
          )
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isCreatingRide = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Booking failed: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: GoRushColors.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.lg),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md),
            child: Text('Choose a ride', style: GoRushTypography.h3),
          ),
          const SizedBox(height: GoRushSpacing.md),
          if (_isLoading)
            const SizedBox(
              height: 200,
              child: Center(child: CircularProgressIndicator()),
            )
          else if (_error != null)
            Padding(
              padding: const EdgeInsets.all(GoRushSpacing.md),
              child: Text(_error!, style: GoRushTypography.body1.copyWith(color: GoRushColors.error)),
            )
          else
            ..._quotes.map((quote) => _buildQuoteTile(quote)).toList(),
          
          if (_isExpired)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: GoRushSpacing.xs),
              child: Text(
                'Fare expired. Please refresh the quote.',
                style: GoRushTypography.body2.copyWith(color: GoRushColors.error),
                textAlign: TextAlign.center,
              ),
            ),
          
          Padding(
            padding: const EdgeInsets.all(GoRushSpacing.md),
            child: ElevatedButton(
              onPressed: (_isExpired || _isCreatingRide) ? (_isExpired ? _loadQuotes : null) : _confirmRide,
              style: ElevatedButton.styleFrom(
                backgroundColor: _isExpired ? GoRushColors.surfaceVariant : GoRushColors.primary,
                foregroundColor: _isExpired ? GoRushColors.onSurfaceVariant : GoRushColors.onPrimary,
                padding: const EdgeInsets.symmetric(vertical: GoRushSpacing.md),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: _isCreatingRide
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white))
                  : Text(
                      _isExpired ? 'Refresh Quote' : 'Confirm ${_selectedQuote?.rideCategory.displayName ?? "Ride"}',
                      style: GoRushTypography.button,
                    ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuoteTile(Quote quote) {
    final isSelected = _selectedQuote?.quoteId == quote.quoteId;

    return GestureDetector(
      onTap: () {
        if (!_isExpired && !_isCreatingRide) {
          setState(() => _selectedQuote = quote);
        }
      },
      child: Container(
        color: isSelected ? GoRushColors.primaryContainer : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: GoRushSpacing.md, vertical: GoRushSpacing.md),
        child: Row(
          children: [
            const Icon(Icons.directions_car, size: 40, color: GoRushColors.primary), // Mock Icon
            const SizedBox(width: GoRushSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    quote.rideCategory.displayName,
                    style: GoRushTypography.h4.copyWith(
                      color: isSelected ? GoRushColors.onPrimaryContainer : GoRushColors.onSurface,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${(quote.durationSeconds / 60).ceil()} mins away • ${quote.rideCategory.capacity} 👤',
                    style: GoRushTypography.body2.copyWith(
                      color: isSelected ? GoRushColors.onPrimaryContainer.withOpacity(0.8) : GoRushColors.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  quote.fareBreakdown.total.formatted,
                  style: GoRushTypography.h3.copyWith(
                    color: isSelected ? GoRushColors.onPrimaryContainer : GoRushColors.onSurface,
                  ),
                ),
                GestureDetector(
                  onTap: () => _showFareBreakdown(quote),
                  child: const Padding(
                    padding: EdgeInsets.only(top: 4.0),
                    child: Icon(Icons.info_outline, size: 20, color: GoRushColors.primary),
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
