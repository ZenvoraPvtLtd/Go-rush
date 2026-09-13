var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let LocationSanityPolicy = class LocationSanityPolicy {
    MAX_ACCEPTABLE_ACCURACY_METERS = 50;
    evaluate(payload) {
        if (payload.latitude < -90 || payload.latitude > 90) {
            return { isValid: false, reason: 'INVALID_LATITUDE' };
        }
        if (payload.longitude < -180 || payload.longitude > 180) {
            return { isValid: false, reason: 'INVALID_LONGITUDE' };
        }
        if (payload.accuracy < 0 || payload.accuracy > this.MAX_ACCEPTABLE_ACCURACY_METERS) {
            return { isValid: false, reason: 'POOR_GPS_ACCURACY' };
        }
        if (payload.speed !== undefined && payload.speed < 0) {
            return { isValid: false, reason: 'INVALID_SPEED' };
        }
        if (payload.heading !== undefined && (payload.heading < 0 || payload.heading > 360)) {
            return { isValid: false, reason: 'INVALID_HEADING' };
        }
        return { isValid: true };
    }
};
LocationSanityPolicy = __decorate([
    Injectable()
], LocationSanityPolicy);
export { LocationSanityPolicy };
//# sourceMappingURL=location-sanity-policy.js.map