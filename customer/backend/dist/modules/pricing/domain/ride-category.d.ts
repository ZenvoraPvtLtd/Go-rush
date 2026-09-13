export declare enum RideCategoryType {
    BIKE = "BIKE",
    AUTO = "AUTO",
    MINI_SEDAN = "MINI_SEDAN"
}
export interface RideCategory {
    id: string;
    code: RideCategoryType;
    displayName: string;
    description: string;
    capacity: number;
}
export declare const CATEGORIES: Record<RideCategoryType, RideCategory>;
