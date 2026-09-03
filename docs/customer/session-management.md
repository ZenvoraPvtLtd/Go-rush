# Session Management Architecture

## Token Lifecycle
The application uses short-lived **Access Tokens** and rotating **Refresh Tokens**.
1. **Access Token**: Sent with every protected API request in the `Authorization: Bearer <token>` header.
2. **Refresh Token**: Used to securely obtain a new Access Token when it expires (HTTP 401).

## Concurrent Refresh Protection
The Flutter `AuthInterceptor` is designed to prevent race conditions during token refresh.
If multiple API requests fail simultaneously with a `401 Unauthorized`:
1. The first request triggers the refresh process.
2. Subsequent requests are queued and wait for the refresh `Completer`.
3. Once the refresh completes, all queued requests are retried with the new token.
4. If refresh fails, the session is cleared, and all requests fail, forcing a logout.

## Device Session Abstraction
A `DeviceSessionManager` maintains metadata about the current installation.
This allows the backend to:
- Track active devices.
- Support remote "Logout from all devices" in the future.
