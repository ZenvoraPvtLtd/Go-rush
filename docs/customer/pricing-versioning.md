# Pricing Versioning

## The `pricingVersion` Field
Every `Quote` contains a `pricingVersion` (e.g., `v1.0.0` or `city-indore-2023`). 

## Why it exists
When a ride is completed and a customer disputes the cost two weeks later, support agents must reconstruct exactly why the fare was calculated that way. Since Base Fares and Surge rules change daily, the `pricingVersion` ties the Quote snapshot back to the exact historical database configuration rules used during generation.

Silently updating active pricing configurations is strictly forbidden. Pricing changes must generate a new Version ID.
