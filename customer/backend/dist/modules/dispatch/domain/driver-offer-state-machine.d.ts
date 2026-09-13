import { DriverOfferStatus } from './driver-offer.js';
export declare class DriverOfferStateMachine {
    private static readonly transitions;
    static validateTransition(currentState: DriverOfferStatus, nextState: DriverOfferStatus): void;
    static isTerminal(state: DriverOfferStatus): boolean;
}
