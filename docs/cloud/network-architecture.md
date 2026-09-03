# Target Network Architecture

## Architecture Rules
1. **Public Subnet:** Only the TLS-terminating Load Balancer/API Gateway is permitted internet ingress.
2. **Private Subnet:** The Node.js Core Backend compute instances. Outbound internet access via NAT Gateway only.
3. **Isolated Data Subnet:** PostgreSQL and Redis instances. **STRICTLY NO INTERNET INGRESS**.

## Network Security Groups
- `SG-LoadBalancer`: Allow `0.0.0.0/0` on port 443.
- `SG-Backend`: Allow `SG-LoadBalancer` on port 3000.
- `SG-Database`: Allow `SG-Backend` on port 5432.
- `SG-Redis`: Allow `SG-Backend` on port 6379.
