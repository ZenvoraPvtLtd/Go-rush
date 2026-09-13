import { Driver } from '../domain/driver.js';
import { RideCategoryType } from '../../pricing/domain/ride-category.js';
export interface EligibilityResult {
    isEligible: boolean;
    reason?: string;
}
export declare class DriverEligibilityPolicy {
    private readonly MAX_LOCATION_AGE_SECONDS;
    evaluate(driver: Driver, requiredCategory: RideCategoryType): EligibilityResult;
}
