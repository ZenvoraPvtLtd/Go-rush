# Analytics Privacy & PII Classification

## Data Masking
The Data Warehouse must NOT ingest raw, unmasked PII unless legally required and explicitly authorized.

- **Passwords/Hashes:** `RESTRICTED` (Never ingested).
- **Payment PAN/CVV:** `RESTRICTED` (Never touches GoRush servers, definitely never ingested).
- **KYC Document Images:** `RESTRICTED` (Never ingested; Analytics only ingests the `status` enum).
- **Precise GPS Routes:** `CONFIDENTIAL` (Coarsened to H3 hexagons or Zip Codes before aggregation).

## Export Controls
Any Admin user attempting to Export a CSV from the BI tool must pass through the `ANALYTICS_EXPORT` RBAC permission.
