# WebSocket Contract

## Overview
WebSockets are used for real-time bidirectional communication between the clients and the GoRush Core Backend.

## Connection
- **Endpoint**: `wss://api.gorush.com/ws`
- **Authentication**: JWT token passed in the connection query parameters or headers.

## Namespaces
- `/customer`: For customer app real-time updates.
- `/driver`: For driver app real-time updates and location telemetry.
- `/admin`: For admin dashboard live metrics.

## Events

### Client -> Server (Emits)
- `driver:location:update`: Driver sending high-frequency GPS coordinates.
- `ride:subscribe`: Client subscribing to a specific ride room.

### Server -> Client (Listeners)
- `ride:state:changed`: Emitted when the canonical ride state machine transitions.
- `driver:location:sync`: Sent to customers to show the driver's current position on the map.
- `dispatch:offer`: Sent to a driver when a new ride is offered to them.
- `notification:new`: General real-time notifications.

## Error Handling
Socket errors will emit an `error` event with standard error codes to allow clients to gracefully reconnect or display messages.
