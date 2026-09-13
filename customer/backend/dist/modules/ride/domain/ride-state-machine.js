import { RideStatus } from './ride.js';
import { BadRequestException } from '@nestjs/common';
export class RideStateMachine {
    static transitions = {
        [RideStatus.REQUESTED]: [RideStatus.SEARCHING, RideStatus.CANCELLED, RideStatus.FAILED],
        [RideStatus.SEARCHING]: [RideStatus.DRIVER_ASSIGNED, RideStatus.CANCELLED, RideStatus.NO_DRIVER],
        [RideStatus.DRIVER_ASSIGNED]: [RideStatus.DRIVER_EN_ROUTE, RideStatus.CANCELLED],
        [RideStatus.DRIVER_EN_ROUTE]: [RideStatus.DRIVER_ARRIVED, RideStatus.CANCELLED],
        [RideStatus.DRIVER_ARRIVED]: [RideStatus.RIDE_STARTED, RideStatus.CANCELLED],
        [RideStatus.RIDE_STARTED]: [RideStatus.RIDE_IN_PROGRESS],
        [RideStatus.RIDE_IN_PROGRESS]: [RideStatus.RIDE_COMPLETED],
        [RideStatus.RIDE_COMPLETED]: [],
        [RideStatus.CANCELLED]: [],
        [RideStatus.NO_DRIVER]: [],
        [RideStatus.FAILED]: [],
    };
    static validateTransition(currentState, nextState) {
        const allowedNextStates = this.transitions[currentState];
        if (!allowedNextStates) {
            throw new BadRequestException({ code: 'RIDE_INVALID_STATE', message: 'Current state is invalid.' });
        }
        if (!allowedNextStates.includes(nextState)) {
            throw new BadRequestException({
                code: 'RIDE_INVALID_TRANSITION',
                message: `Cannot transition from ${currentState} to ${nextState}.`,
            });
        }
    }
    static isTerminal(state) {
        return this.transitions[state].length === 0;
    }
}
//# sourceMappingURL=ride-state-machine.js.map