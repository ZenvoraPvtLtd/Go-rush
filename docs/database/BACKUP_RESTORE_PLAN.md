# Backup and Restore Plan

## Overview
Defines the data retention and disaster recovery strategies for the GoRush PostgreSQL/PostGIS databases.

## Backup Strategy
1. **Continuous Archiving (WAL)**: Write-Ahead Logs streamed continuously to secure S3 storage (Point-in-Time Recovery capability up to 5 minutes RPO).
2. **Daily Snapshots**: Automated full RDS/EBS database snapshots taken at 02:00 AM UTC.
3. **Retention Policy**:
   - WAL logs retained for 30 days.
   - Daily snapshots retained for 90 days.
   - Monthly snapshots retained for 7 years (Financial Compliance).

## Restore Plan
1. **Disaster Recovery (DR)**: In the event of catastrophic failure, spin up an RDS read-replica or restore from the latest snapshot in a secondary geographic region (RTO < 2 hours).
2. **Data Corruption**: Utilize Point-in-Time Recovery (PITR) to rollback the database to the exact minute prior to corruption.

## Security
- All backups are encrypted at rest using AES-256 (KMS keys).
- Access to backup vaults is strictly limited via IAM to the DevOps/Super Admin roles.
