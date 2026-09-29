# Phase 11 - Build & Test Matrix

| Application | Command | Result | Errors | Warnings | Evidence | Status |
|---|---|---|---|---|---|---|
| Backend | `npm run build` | PASS | 0 | 16 (Ignored) | NestJS compiled to `dist/` | PASS |
| Backend | `npx vitest run` | PASS | 0 | 0 | 28/28 tests passed (3.14s) | PASS |
| Customer | `flutter analyze` | PASS | 0 | 0 | `No issues found! (ran in 3.5s)` | PASS |
| Customer | `flutter test` | PASS | 0 | 0 | `All tests passed!` | PASS |
| Driver | `flutter analyze` | PASS | 0 | 0 | `No issues found! (ran in 5.5s)` | PASS |
| Driver | `flutter test` | PARTIAL | UI Hang | 0 | `auth_integration_test.dart` assertions pass, but subsequent UI pump widgets hang headless. | PARTIAL |
| Driver | `flutter build apk`| BLOCKED | 1 | 0 | `[!] No Android SDK found. Try setting the ANDROID_HOME environment variable.` | BLOCKED |
| Admin | `npm install` | BLOCKED | 1 | 0 | `npm error nospc ENOSPC: no space left on device, write` | BLOCKED |
| Admin | `npm run build` | BLOCKED | 1 | 0 | Cannot execute without `node_modules` | BLOCKED |
