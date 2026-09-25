# Deployment Architecture

## CI/CD Pipeline
1. **PR Checks:** Lint, Typecheck, and Unit Tests via GitHub Actions.
2. **Merge to Main:** Triggers Docker image build.
3. **Artifact Repository:** Push to ECR / GCR.
4. **Staging Deploy:** Rolling deployment to Compute cluster.
5. **Database Migrations:** Executed dynamically by a temporary ephemeral CI/CD task runner (never the backend service itself).

*Status: DESIGNED — NOT DEPLOYED*
