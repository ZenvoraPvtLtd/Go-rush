export declare enum RideShareStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED",
    COMPLETED = "COMPLETED"
}
export interface RideShareSession {
    id: string;
    rideId: string;
    customerId: string;
    recipientName: string;
    recipientPhoneHash: string;
    status: RideShareStatus;
    tokenHash: string;
    createdAt: Date;
    expiresAt: Date;
    revokedAt?: Date;
    consentVersion: string;
}
export declare class RideShareStateMachine {
    static canTransition(current: RideShareStatus, next: RideShareStatus): boolean;
}
