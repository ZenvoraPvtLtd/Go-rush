# Pricing Architecture

## Objective
The pricing architecture ensures that the **backend is strictly the authoritative source** of all fare calculations. The Flutter application is merely a secure presenter of the quote.

## Components
1. **PricingEngine**: The core calculator in the NestJS backend. It receives a `PricingContext` (distance, duration, city).
2. **PricingRules**: The engine iterates through an array of composable rules (e.g., `BaseFareRule`, `DistanceFareRule`, `SurgeRule`). Each rule can add a `FareComponent` or apply a multiplier.
3. **Money Abstraction**: All calculations are performed in integer minor units (e.g., paise, cents) to prevent floating-point precision loss.

## Future Admin Integration
Pricing rules currently have stubbed development defaults. In production, these values will be hydrated from the Core Backend database, which will be managed via the Admin Panel.
