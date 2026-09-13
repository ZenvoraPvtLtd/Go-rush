import { RideStatus } from './ride.js';
export declare class RideStateMachine {
    private static readonly transitions;
    static validateTransition(currentState: RideStatus, nextState: RideStatus): void;
    static isTerminal(state: RideStatus): boolean;
}
