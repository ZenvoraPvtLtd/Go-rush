# Mobile Performance (Customer & Partner)

## Analyzer Status
- **Customer Flutter Analyzer:** PASS (No abnormal terminations. Emits standard syntax/lint warnings. ran in `1.2s`)
- **Partner Flutter Analyzer:** PASS (No abnormal terminations. Emits standard syntax/lint warnings. ran in `1.2s`)

## Rendering Efficiency (Design Rules)
- **Map Rebuilds:** Location packets should only update the specific `Marker` position, NOT trigger a `setState` on the entire Map view.
- **WebSocket Disposal:** Backgrounded or terminated apps MUST strictly dispose of active `StreamSubscriptions` to prevent memory leaks.

*Dynamic FPS and Battery Load measurements are NOT MEASURED pending dynamic Staging API endpoints.*
