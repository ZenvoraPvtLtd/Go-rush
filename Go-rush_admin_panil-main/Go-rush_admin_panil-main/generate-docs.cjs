const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs', 'analytics');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const runbooksDir = path.join(docsDir, 'runbooks');
if (!fs.existsSync(runbooksDir)) {
  fs.mkdirSync(runbooksDir, { recursive: true });
}

const docs = [
  'domain-ownership.md',
  'event-contracts.md',
  'event-versioning.md',
  'event-idempotency.md',
  'event-replay.md',
  'raw-data-layer.md',
  'curated-data-model.md',
  'dimension-model.md',
  'kpi-governance.md',
  'data-lineage.md',
  'data-catalog.md',
  'data-quality.md',
  'pii-classification.md',
  'rbac.md',
  'ride-analytics.md',
  'customer-analytics.md',
  'partner-analytics.md',
  'dispatch-analytics.md',
  'quality-analytics.md',
  'support-analytics.md',
  'risk-analytics.md',
  'compliance-analytics.md',
  'growth-analytics.md',
  'notification-analytics.md',
  'reconciliation.md',
  'dashboard-architecture.md',
  'analytics-api.md',
  'query-performance.md',
  'cost-control.md',
  'retention.md',
  'disaster-recovery.md',
  'security.md',
  'testing.md',
  'observability.md'
];

const runbooks = [
  'event-ingestion-failure.md',
  'event-duplication.md',
  'event-processing-lag.md',
  'data-quality-incident.md',
  'financial-reconciliation-mismatch.md',
  'analytics-database-down.md',
  'dashboard-data-stale.md',
  'unauthorized-export.md',
  'pii-leakage.md',
  'schema-breaking-change.md'
];

docs.forEach(doc => {
  const filePath = path.join(docsDir, doc);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `# ${doc.replace('.md', '').toUpperCase().replace(/-/g, ' ')}\n\nBUSINESS DECISION REQUIRED for complete implementation details. Currently in design phase. Analytics remain downstream only.`);
  }
});

runbooks.forEach(runbook => {
  const filePath = path.join(runbooksDir, runbook);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `# ${runbook.replace('.md', '').toUpperCase().replace(/-/g, ' ')}\n\n## Detection\n## Impact\n## Containment\n## Investigation\n## Recovery\n## Validation\n## Escalation\n## Post-Incident Actions\n`);
  }
});

console.log('Docs generated successfully.');
