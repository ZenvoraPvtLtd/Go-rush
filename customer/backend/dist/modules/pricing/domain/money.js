export class Money {
    amountMinor;
    currency;
    constructor(amountMinor, currency = 'INR') {
        this.amountMinor = amountMinor;
        this.currency = currency;
    }
    add(other) {
        if (this.currency !== other.currency) {
            throw new Error('Currency mismatch');
        }
        return new Money(this.amountMinor + other.amountMinor, this.currency);
    }
    subtract(other) {
        if (this.currency !== other.currency) {
            throw new Error('Currency mismatch');
        }
        return new Money(this.amountMinor - other.amountMinor, this.currency);
    }
}
//# sourceMappingURL=money.js.map