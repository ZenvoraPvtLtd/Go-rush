import { DriverOfferStatus } from './driver-offer.js';
import { BadRequestException } from '@nestjs/common';
export class DriverOfferStateMachine {
    static transitions = {
        [DriverOfferStatus.PENDING]: [
            DriverOfferStatus.ACCEPTED,
            DriverOfferStatus.REJECTED,
            DriverOfferStatus.EXPIRED,
            DriverOfferStatus.CANCELLED,
        ],
        [DriverOfferStatus.ACCEPTED]: [],
        [DriverOfferStatus.REJECTED]: [],
        [DriverOfferStatus.EXPIRED]: [],
        [DriverOfferStatus.CANCELLED]: [],
    };
    static validateTransition(currentState, nextState) {
        const allowed = this.transitions[currentState];
        if (!allowed || !allowed.includes(nextState)) {
            throw new BadRequestException({
                code: 'OFFER_INVALID_TRANSITION',
                message: `Cannot transition offer from ${currentState} to ${nextState}.`,
            });
        }
    }
    static isTerminal(state) {
        return this.transitions[state].length === 0;
    }
}
//# sourceMappingURL=driver-offer-state-machine.js.map