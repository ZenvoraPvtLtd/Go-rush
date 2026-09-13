import { Driver } from '../domain/driver.js';
export interface RankedDriver {
    driver: Driver;
    distanceMeters: number;
    score: number;
}
export declare class DriverRankingPolicy {
    rank(candidates: {
        driver: Driver;
        distanceMeters: number;
    }[]): RankedDriver[];
}
