# Compliance Document Model & Versioning

## Document Abstraction
To safely handle physical documents, we never store binary images directly in the SQL database.

```typescript
interface ComplianceDocument {
    id: string;
    ownerId: string; // Partner or Vehicle ID
    documentType: string; // e.g. DRIVING_LICENCE, RC, INSURANCE
    storageReference: string; // S3 object key or equivalent
    status: DocumentStatus; // PENDING, APPROVED, REJECTED, EXPIRED
    expiresAt?: Date;
    version: number;
}
```

## Versioning
When a Partner uploads a new Insurance certificate to replace a rejected one, the system creates a new `ComplianceDocument` with an incremented `version`. The historical rejected row is preserved for audit trails.
