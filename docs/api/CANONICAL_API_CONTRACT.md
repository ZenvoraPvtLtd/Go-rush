# Canonical API Contract

## Overview
This document defines the Canonical API Contract for the GoRush Core Backend. It acts as the single source of truth for Customer, Driver, and Admin applications.

## Endpoints

### AUTH
- `POST /api/v1/auth/login` - Authenticate user (Customer/Driver/Admin)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - Invalidate session

### USERS
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update profile

### DRIVERS
- `GET /api/v1/drivers/me` - Get driver profile
- `PUT /api/v1/drivers/status` - Update online/offline status
- `POST /api/v1/drivers/location` - Update current coordinates

### VEHICLES
- `GET /api/v1/vehicles` - List driver vehicles
- `POST /api/v1/vehicles` - Add new vehicle

### KYC
- `POST /api/v1/kyc/submit` - Submit documents
- `GET /api/v1/kyc/status` - Check verification status

### PLACES & MAPS
- `GET /api/v1/places/search` - Search locations
- `GET /api/v1/maps/route` - Calculate route and ETA

### PRICING & QUOTES
- `POST /api/v1/pricing/quote` - Generate ride quote based on route

### RIDES & DISPATCH
- `POST /api/v1/rides` - Request a ride
- `GET /api/v1/rides/:id` - Get ride details
- `POST /api/v1/rides/:id/cancel` - Cancel ride
- `POST /api/v1/dispatch/accept` - Driver accepts ride
- `POST /api/v1/dispatch/reject` - Driver rejects ride

### PAYMENTS & WALLETS
- `GET /api/v1/wallets/balance` - Get wallet balance
- `POST /api/v1/payments/charge` - Process ride payment

### EARNINGS
- `GET /api/v1/earnings/daily` - Get driver daily earnings

### NOTIFICATIONS
- `GET /api/v1/notifications` - Get user notifications

### SAFETY
- `POST /api/v1/safety/sos` - Trigger SOS alert

### SUPPORT
- `POST /api/v1/support/tickets` - Create support ticket

### ADMIN
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/rides` - List all rides

### ANALYTICS
- `GET /api/v1/analytics/dashboard` - Admin dashboard metrics

## Standard Responses
All APIs will respond with a consistent structure:
```json
{
  "success": true,
  "data": {},
  "error": null,
  "requestId": "uuid"
}
```
