export var RideShareStatus;
(function (RideShareStatus) {
    RideShareStatus["PENDING"] = "PENDING";
    RideShareStatus["ACTIVE"] = "ACTIVE";
    RideShareStatus["REVOKED"] = "REVOKED";
    RideShareStatus["EXPIRED"] = "EXPIRED";
    RideShareStatus["COMPLETED"] = "COMPLETED";
})(RideShareStatus || (RideShareStatus = {}));
export class RideShareStateMachine {
    static canTransition(current, next) {
        const transitions = {
            [RideShareStatus.PENDING]: [RideShareStatus.ACTIVE, RideShareStatus.REVOKED, RideShareStatus.EXPIRED],
            [RideShareStatus.ACTIVE]: [RideShareStatus.REVOKED, RideShareStatus.EXPIRED, RideShareStatus.COMPLETED],
            [RideShareStatus.REVOKED]: [],
            [RideShareStatus.EXPIRED]: [],
            [RideShareStatus.COMPLETED]: [],
        };
        return transitions[current].includes(next);
    }
}
//# sourceMappingURL=ride-share-session.js.map