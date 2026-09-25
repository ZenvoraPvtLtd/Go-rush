# Business Decisions Required Register

The following Risk policies must be explicitly defined by the Business before the Fraud Platform can be utilized for Live Operations:
1. **Machine Learning Fraud Provider:** (e.g., Sift, Stripe Radar, AWS Fraud Detector).
2. **IP / Device Intelligence Provider:** To identify suspicious hardware or VPNs.
3. **Automatic Enforcement Policy:** Which rules are allowed to instantly ban a user vs route to manual review.
4. **False Positive / Appeals:** How customers can verify their identity if wrongly flagged.
