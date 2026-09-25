# Data Retention

## Policy by Data Class

- **Raw Events**: 7 years (Conceptual, Data Warehouse NOT CONFIGURED)
- **Curated Facts**: 7 years
- **Aggregates**: Indefinite
- **Audit Records**: 7 years
- **Location Data (Raw)**: BUSINESS DECISION REQUIRED (Legal/Business policy unavailable)
- **Financial Analytics**: 7 years
- **Support Analytics**: 3 years
- **Risk Analytics**: 5 years

*Note: As there is no analytics warehouse, current retention defaults to the operational PostgreSQL database policy.*