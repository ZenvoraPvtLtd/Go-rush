var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { DriverStatus } from '../domain/driver.js';
import { RideCategoryType } from '../../pricing/domain/ride-category.js';
let MockDriverLocationProvider = class MockDriverLocationProvider {
    mockDrivers = [
        {
            driverId: 'drv_1',
            name: 'Ramesh K.',
            vehicleCategory: RideCategoryType.MINI_SEDAN,
            status: DriverStatus.AVAILABLE,
            currentLocation: { lat: 22.7196, lng: 75.8577, updatedAt: new Date() },
            serviceAreaId: 'indore',
            isVerified: true,
        },
        {
            driverId: 'drv_2',
            name: 'Suresh M.',
            vehicleCategory: RideCategoryType.BIKE,
            status: DriverStatus.AVAILABLE,
            currentLocation: { lat: 22.7200, lng: 75.8580, updatedAt: new Date() },
            serviceAreaId: 'indore',
            isVerified: true,
        },
        {
            driverId: 'drv_3',
            name: 'Amit P.',
            vehicleCategory: RideCategoryType.AUTO,
            status: DriverStatus.ON_TRIP,
            currentLocation: { lat: 22.7210, lng: 75.8590, updatedAt: new Date() },
            serviceAreaId: 'indore',
            isVerified: true,
        }
    ];
    async findNearbyDrivers(lat, lng, radiusMeters) {
        return this.mockDrivers.map((d, i) => ({
            driver: d,
            distanceMeters: (i + 1) * 500,
        }));
    }
    async getDriver(driverId) {
        return this.mockDrivers.find(d => d.driverId === driverId) || null;
    }
};
MockDriverLocationProvider = __decorate([
    Injectable()
], MockDriverLocationProvider);
export { MockDriverLocationProvider };
//# sourceMappingURL=mock-driver-location.provider.js.map