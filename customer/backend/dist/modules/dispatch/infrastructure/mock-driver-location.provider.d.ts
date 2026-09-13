import { Driver } from '../domain/driver.js';
export declare class MockDriverLocationProvider {
    private mockDrivers;
    findNearbyDrivers(lat: number, lng: number, radiusMeters: number): Promise<{
        driver: Driver;
        distanceMeters: number;
    }[]>;
    getDriver(driverId: string): Promise<Driver | null>;
}
