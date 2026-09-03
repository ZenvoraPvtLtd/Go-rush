# Business Decisions Required Register

The following Notification rules must be explicitly defined by the Business before Live Providers can be activated:
1. **Approved Push Provider:** (e.g. Firebase FCM, Apple APNs)
2. **Approved SMS Provider:** (e.g. Twilio, AWS SNS)
3. **Approved Email Provider:** (e.g. SendGrid, SES)
4. **Delivery Guarantees:** Do we silently drop non-critical push notifications on failure, or SMS fallback?
5. **Marketing Consent:** Explicit legal policy for isolating transactional vs marketing templates.
