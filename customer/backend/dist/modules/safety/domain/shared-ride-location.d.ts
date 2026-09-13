export interface SharedRideLocation {
    latitude: number;
    longitude: number;
    updatedAt: Date;
}
export declare class SharedRideLocationMapper {
    static fromInternalPayload(payload: any): SharedRideLocation;
}
