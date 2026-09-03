# Cloud Cost Optimization

## Staging Limits
To prevent runaway Staging costs:
1. **Compute:** Utilize Serverless compute (e.g., AWS Fargate/Cloud Run) scaling down to 0 or 1 instance during off-hours.
2. **Database:** Provision a small instance (e.g., `db.t4g.small` or equivalent) with minimal burst IOPS.
3. **Caching:** Deploy a single-node Redis instance instead of a Multi-AZ cluster for staging.
4. **Log Retention:** Limit Staging CloudWatch/Stackdriver log retention to 14 days.
