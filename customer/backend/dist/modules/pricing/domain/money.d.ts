export declare class Money {
    readonly amountMinor: number;
    readonly currency: string;
    constructor(amountMinor: number, currency?: string);
    add(other: Money): Money;
    subtract(other: Money): Money;
}
