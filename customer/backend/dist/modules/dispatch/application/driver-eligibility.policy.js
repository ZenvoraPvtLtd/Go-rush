var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { DriverStatus } from '../domain/driver.js';
let DriverEligibilityPolicy = class DriverEligibilityPolicy {
    MAX_LOCATION_AGE_SECONDS = 120;
    evaluate(driver, requiredCategory) {
        if (!driver.isVerified) {
            return { isEligible: false, reason: 'VERIFICATION_INVALID' };
        }
        if (driver.status === DriverStatus.OFFLINE) {
            return { isEligible: false, reason: 'DRIVER_OFFLINE' };
        }
        if (driver.status === DriverStatus.SUSPENDED) {
            return { isEligible: false, reason: 'DRIVER_SUSPENDED' };
        }
        if (driver.status === DriverStatus.ON_TRIP) {
            return { isEligible: false, reason: 'DRIVER_BUSY' };
        }
        if (driver.status === DriverStatus.OFFERED) {
            return { isEligible: false, reason: 'ALREADY_OFFERED' };
        }
        if (driver.vehicleCategory !== requiredCategory) {
            return { isEligible: false, reason: 'CATEGORY_MISMATCH' };
        }
        if (!driver.currentLocation) {
            return { isEligible: false, reason: 'LOCATION_UNKNOWN' };
        }
        const ageInSeconds = (Date.now() - driver.currentLocation.updatedAt.getTime()) / 1000;
        if (ageInSeconds > this.MAX_LOCATION_AGE_SECONDS) {
            return { isEligible: false, reason: 'LOCATION_STALE' };
        }
        return { isEligible: true };
    }
};
DriverEligibilityPolicy = __decorate([
    Injectable()
], DriverEligibilityPolicy);
export { DriverEligibilityPolicy };
//# sourceMappingURL=driver-eligibility.policy.js.map