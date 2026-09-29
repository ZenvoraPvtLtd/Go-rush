# PHASE 12B1 — CUSTOMER NETWORK AUDIT

## Overview
This document serves as the initial audit of the Customer App networking architecture before proceeding with the Phase 12B-1 migration to the canonical API (`Go-rush/Backend/`).

## Architecture Identification
- **ApiConfig**: Found in `lib/core/network/api_config.dart`. Supports `String.fromEnvironment('API_URL')` but includes hardcoded fallbacks for `10.0.2.2:3001` and `localhost:3001` that apply even in production runtime if no environment variable is passed.
- **API Client**: The application lacks a centralized, single-instance Dio client with interceptors for authentication. Instead, repositories instantiate their own `Dio` instances or take them via constructors.
- **HTTP client/interceptors**: Missing a global authentication interceptor. Repositories manually inject `Authorization: Bearer mock_access_token` into headers.
- **Auth repository/service**: Needs to be connected to proper JWT secure storage.
- **Token storage**: Currently non-existent for API calls, as repositories use hardcoded string tokens.
- **Auth state/session manager**: Bypassed for most HTTP calls since repositories hardcode the `mock_access_token`.

## Hardcoded URLs and Headers
Based on exhaustive search, the following repositories and files bypass centralized networking and hardcode legacy backend URLs and mock tokens:

1. **`lib/core/pricing/data/quote_repository.dart`**
   - Hardcoded: `baseUrl: 'http://localhost:3001/v1'`
   - Hardcoded: `'Authorization': 'Bearer mock_access_token'`

2. **`lib/core/ride/data/ride_repository.dart`**
   - Hardcoded: `baseUrl: 'http://localhost:3001/v1'`
   - Hardcoded: `'Authorization': 'Bearer mock_access_token'`

3. **`lib/core/wallet/data/wallet_repository.dart`**
   - Hardcoded: `baseUrl: 'http://localhost:3001/v1'`
   - Hardcoded: `'Authorization': 'Bearer mock_access_token'`

4. **`lib/core/user/data/user_repository.dart`**
   - Hardcoded: `baseUrl: 'http://localhost:3001/v1'`

5. **`lib/features/safety/data/safety_repository.dart`**
   - Hardcoded: `baseUrl: 'http://localhost:3000/v1/safety'`

6. **`lib/features/travel/presentation/travel_screen.dart`**
   - Hardcoded: `static const String _baseUrl = 'http://localhost:4000';`

7. **`lib/core/network/api_config.dart`**
   - Contains fallback to `http://10.0.2.2:3001/v1` and `http://localhost:3001/v1`

## Required Refactoring Plan
1. **ApiConfig**: Remove the direct localhost fallbacks for production runtime. Ensure it strictly uses environment variables or a staging/production domain config.
2. **Centralized Dio Client**: Create a `lib/core/network/dio_client.dart` that configures `baseUrl` using `ApiConfig` and adds an interceptor.
3. **Auth Interceptor**: The interceptor will fetch the real token from secure storage and attach it to the `Authorization: Bearer` header.
4. **Repository Refactor**: Strip all `baseUrl` definitions and `mock_access_token` headers from the repositories and inject the centralized `Dio` client.

*Audit complete. Proceeding to implementation steps.*
