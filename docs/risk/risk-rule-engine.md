# Risk Rule Engine & Versioning

## Deterministic Rules
To prevent "black-box" enforcement, every Risk Evaluation must trace back to a specific Rule Version.

```typescript
interface RiskRule {
    ruleId: string;
    version: string;
    evaluate(context: RiskContext): RiskDecision;
}
```

If a user is blocked, Support Agents can see exactly which rule (`ruleId: VELOCITY_01`, `version: 1.2`) triggered the block.

## Rule States
Rules can be in `DRAFT`, `ACTIVE`, `DISABLED`, or `RETIRED`.
