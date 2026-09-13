var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, BadRequestException } from '@nestjs/common';
let PlacesService = class PlacesService {
    async autocomplete(query) {
        if (!query) {
            throw new BadRequestException({ code: 'PLACE_MISSING_QUERY', message: 'Query is required' });
        }
        await new Promise((resolve) => setTimeout(resolve, 150));
        return [
            {
                placeId: 'mock_place_1',
                description: `${query}, Bangalore, India`,
                mainText: query,
                secondaryText: 'Bangalore, India',
            },
            {
                placeId: 'mock_place_2',
                description: `${query} Road, Bangalore`,
                mainText: `${query} Road`,
                secondaryText: 'Bangalore, India',
            }
        ];
    }
    async geocode(address) {
        if (!address) {
            throw new BadRequestException({ code: 'GEO_MISSING_ADDRESS', message: 'Address is required' });
        }
        await new Promise((resolve) => setTimeout(resolve, 150));
        return { latitude: 12.9716, longitude: 77.5946 };
    }
    async reverseGeocode(lat, lng) {
        if (!lat || !lng) {
            throw new BadRequestException({ code: 'GEO_INVALID_COORDINATE', message: 'Coordinates are required' });
        }
        await new Promise((resolve) => setTimeout(resolve, 150));
        return { address: 'Mock St, Bangalore, India' };
    }
    async placeDetails(placeId) {
        if (!placeId) {
            throw new BadRequestException({ code: 'PLACE_MISSING_ID', message: 'Place ID is required' });
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
        return {
            placeId,
            name: 'Mock Location',
            formattedAddress: 'Mock Address, Bangalore, Karnataka',
            coordinate: { latitude: 12.9716, longitude: 77.5946 }
        };
    }
};
PlacesService = __decorate([
    Injectable()
], PlacesService);
export { PlacesService };
//# sourceMappingURL=places.service.js.map