# GoRush Customer Folder Structure

```text
customer/
├── frontend/               # Customer Flutter Application
│   ├── lib/
│   │   ├── app/            # App initialization, providers, bootstrap
│   │   ├── core/           # Infrastructure, networking, config, errors
│   │   ├── routing/        # Centralized app routing setup
│   │   ├── shared/         # Design system (widgets, buttons, colors)
│   │   └── features/       # Feature modules (auth, home, places, etc.)
│   └── pubspec.yaml
│
└── backend/                # Customer Node.js (NestJS) Backend
    ├── src/
    │   ├── app/            # App module, global filters/pipes
    │   ├── config/         # Environment variables and config schemas
    │   ├── common/         # Shared backend utilities, error models
    │   ├── modules/        # Feature modules matching API domains (v1/auth)
    │   └── infrastructure/ # External provider abstractions
    └── package.json
```
