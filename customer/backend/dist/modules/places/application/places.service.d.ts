export declare class PlacesService {
    autocomplete(query: string): Promise<{
        placeId: string;
        description: string;
        mainText: string;
        secondaryText: string;
    }[]>;
    geocode(address: string): Promise<{
        latitude: number;
        longitude: number;
    }>;
    reverseGeocode(lat: number, lng: number): Promise<{
        address: string;
    }>;
    placeDetails(placeId: string): Promise<{
        placeId: string;
        name: string;
        formattedAddress: string;
        coordinate: {
            latitude: number;
            longitude: number;
        };
    }>;
}
