# KYC & OCR Provider

## Verification Boundaries
Instead of manually typing Aadhaar or DL numbers, the platform will utilize a 3rd Party KYC Provider (e.g. Onfido, Jumio, or a regional API).

```typescript
interface KycVerificationProvider {
    verifyIdentity(documentRef: string, faceMatchRef: string): Promise<VerificationResult>;
    getVerificationStatus(providerReference: string): Promise<VerificationResult>;
}
```

**STATUS: BLOCKED / NOT CONFIGURED**. No Government KYC provider or OCR provider has been licensed or configured. We will not fabricate fake API responses.
