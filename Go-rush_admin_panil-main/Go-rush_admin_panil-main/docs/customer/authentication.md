# GoRush Authentication Architecture

## Overview
The GoRush Customer app uses a **Phone number + OTP** primary authentication method.
This ensures a frictionless onboarding process while maintaining security. The architecture is designed to support future email or social authentication methods.

## Authentication States
The client application manages authentication using strongly-typed states:
- `unknown`: App launch, state not yet determined.
- `unauthenticated`: User needs to log in.
- `sendingOtp`: API request in progress.
- `otpSent`: Awaiting 6-digit input.
- `verifyingOtp`: API request in progress.
- `authenticated`: User has a valid session.
- `profileIncomplete`: User authenticated but needs to provide name/email.
- `sessionExpired`: Token expired and refresh failed.

## Component Boundary
- **AuthRepository**: The abstract interface for authentication.
- **MockOtpProvider**: Used in development to simulate OTP delivery and verification (OTP is statically set to `123456`).
- **ProductionOtpProvider**: Will replace the mock in production without altering UI logic.

## Profile Onboarding
Upon first successful authentication, the backend returns `profileComplete: false`. The Flutter application routes the customer to the Profile Setup screen to collect their Name and (optionally) Email before allowing access to the Home screen.
