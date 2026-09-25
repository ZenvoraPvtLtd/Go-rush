# Canonical API Response Standard

## Success Response
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-09-25T12:00:00Z"
  }
}
```

## Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid payload",
    "details": []
  },
  "requestId": "req-123"
}
```