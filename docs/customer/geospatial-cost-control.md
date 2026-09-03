# Geospatial Cost Control

## Google Maps / Provider API Cost Management
Geospatial APIs (like Places Autocomplete and Directions) are typically billed per request. To control costs at scale:

1. **Debounced Search**: Autocomplete queries are debounced by 400ms on the client.
2. **Server-Side Proxy**: All requests route through the Customer Backend, allowing us to eventually cache frequent lookups (e.g., Airports, Train Stations) in Redis.
3. **Session Tokens**: (Future Phase) Group autocomplete keystrokes and the final place detail request into a single billing session.
4. **Optimized Polling**: Active routing and live tracking rely on intelligent distance filters rather than continuous 1-second interval polls.
