# Payment Architecture

## Overview
The GoRush Platform implements a Provider-Agnostic Payment Engine on the Core Backend.
Clients (Customer App, Partner App) NEVER communicate directly with the Gateway to alter payment state.

## Core Flow
1. **Quote Validation:** `RideController` authorizes the final Fare.
2. **Intent Creation:** The Backend requests a `PaymentIntent` via the `PaymentGatewayAdapter`.
3. **Client Flow:** The Customer App receives the client-secret/token and displays the Gateway UI.
4. **Authoritative Webhook:** The Gateway posts an async Webhook to the Backend.
5. **Ledger Update:** The Webhook triggers an idempotent Ledger Entry.
6. **Ride Completion:** The Ride is marked completed *only* when the Ledger reflects successful capture.
