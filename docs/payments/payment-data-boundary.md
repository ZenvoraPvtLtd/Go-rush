# Payment Data Boundary

## PCI Compliance Principle
The GoRush backend is strictly **Out of Scope** for PCI-DSS Card Data storage.

- **Stored by GoRush:** Customer ID, Payment Method Tokens (e.g. `pm_xxxx`), masked display strings (`Visa ending in 4242`), Expiry Dates.
- **NEVER Stored by GoRush:** Primary Account Number (PAN), CVV/CVC, 3D-Secure PINs, Banking Passwords.
