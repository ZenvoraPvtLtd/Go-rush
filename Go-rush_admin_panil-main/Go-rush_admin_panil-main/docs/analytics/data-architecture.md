# Data Architecture

## Overview
This document defines the provider-neutral data architecture for the Go-rush Enterprise Data Platform. 
Analytics MUST remain downstream/read-only from operational domains.

## Architecture Flow

Operational Source
        ↓
Transactional DB (PostgreSQL)
        ↓
Outbox / Domain Events (via Redis/BullMQ temporarily)
        ↓
Event Transport (NOT PROVISIONED - Conceptual: Kafka/Redpanda)
        ↓
Raw Immutable Event Layer (NOT PROVISIONED - Conceptual: S3)
        ↓
Validation / Deduplication (NOT PROVISIONED - Conceptual: Spark/Flink)
        ↓
Curated Analytical Models (NOT PROVISIONED - Conceptual: Snowflake/BigQuery)
        ↓
Aggregations / Semantic Layer (NestJS Analytics Module against PostgreSQL)
        ↓
BI / Admin Reporting (Admin REST APIs)
        ↓
Product Analytics

## Infrastructure Status
- **Event Broker**: NOT PROVISIONED
- **Raw Object Storage**: NOT PROVISIONED
- **Data Warehouse**: NOT PROVISIONED
- **BI Tool**: NOT PROVISIONED

*Note: Since cloud analytics infrastructure is not provisioned, current lightweight aggregates are served directly via the `analytics` backend module querying the operational PostgreSQL database. Heavy OLAP queries are restricted.*
