# Certificate Management

## TLS Policy
- **Issuer:** AWS Certificate Manager (ACM) or Let's Encrypt (via cert-manager).
- **Renewal:** Fully automated via DNS validation.
- **Termination:** TLS is terminated at the Gateway/Load Balancer. The internal VPC traffic may optionally route via HTTP unless Zero Trust policies mandate internal TLS.
- **Storage:** Private keys are strictly managed by the Cloud Provider and are never exported.
