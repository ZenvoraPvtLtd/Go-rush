# Business Decisions Required Register

The following Analytics policies must be explicitly defined by the Business before the Data Platform can be utilized for Live Operations:
1. **Cloud Data Warehouse Provider:** (e.g., Snowflake, BigQuery, Redshift).
2. **BI Reporting Tool:** (e.g., Looker, Tableau, Metabase).
3. **Data Retention Policy:** How many years of historical ride data must be retained for tax/legal compliance?
4. **Data Freshness SLA:** Is "End-of-Day" batch processing acceptable, or does Operations require Real-Time (sub-minute) streaming latency?
