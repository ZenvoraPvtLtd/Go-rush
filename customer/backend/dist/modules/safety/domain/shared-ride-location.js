export class SharedRideLocationMapper {
    static fromInternalPayload(payload) {
        return {
            latitude: payload.latitude,
            longitude: payload.longitude,
            updatedAt: payload.timestamp,
        };
    }
}
//# sourceMappingURL=shared-ride-location.js.map