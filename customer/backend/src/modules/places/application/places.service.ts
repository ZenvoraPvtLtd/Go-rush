import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PlacesService {
  async autocomplete(query: string) {
    if (!query) {
      throw new BadRequestException({ code: 'PLACE_MISSING_QUERY', message: 'Query is required' });
    }
    
    // Simulate latency and rate-limiting safely
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Mock data for autocomplete
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

  async geocode(address: string) {
    if (!address) {
      throw new BadRequestException({ code: 'GEO_MISSING_ADDRESS', message: 'Address is required' });
    }
    
    await new Promise((resolve) => setTimeout(resolve, 150));
    return { latitude: 12.9716, longitude: 77.5946 }; // Mock Bangalore
  }

  async reverseGeocode(lat: number, lng: number) {
    if (!lat || !lng) {
      throw new BadRequestException({ code: 'GEO_INVALID_COORDINATE', message: 'Coordinates are required' });
    }
    
    await new Promise((resolve) => setTimeout(resolve, 150));
    return { address: 'Mock St, Bangalore, India' };
  }

  async placeDetails(placeId: string) {
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
}
