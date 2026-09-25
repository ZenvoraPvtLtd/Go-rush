import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service.js';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TrackingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private redisService: RedisService) {}

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(
    @MessageBody() data: { driverId: string; lat: number; lng: number; rideId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { driverId, lat, lng, rideId } = data;
    
    // Store live location in Redis for blazing fast retrieval
    const redisClient = this.redisService.getClient();
    await redisClient.geoadd('driver_locations', lng, lat, driverId);

    // If driver is currently on a ride, emit their new location to the rider's room
    if (rideId) {
      this.server.to(`ride_${rideId}`).emit('driverLocationUpdated', { driverId, lat, lng });
    }
  }

  @SubscribeMessage('joinRideRoom')
  handleJoinRideRoom(@MessageBody() data: { rideId: string }, @ConnectedSocket() client: Socket) {
    // Rider and Driver both join a specific room for their ride
    client.join(`ride_${data.rideId}`);
    console.log(`Client ${client.id} joined room ride_${data.rideId}`);
  }
}
