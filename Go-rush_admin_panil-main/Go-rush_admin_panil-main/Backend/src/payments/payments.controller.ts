import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    // In production, verify the signature with Stripe/Razorpay SDK
    const { type, data } = body;
    
    if (type === 'payment_intent.succeeded') {
      const rideId = data.object.metadata.rideId;
      const paymentId = data.object.id;
      
      await this.prisma.ride.update({
        where: { id: rideId },
        data: { paymentStatus: 'PAID', paymentId },
      });
      console.log(`[Webhook] Ride ${rideId} marked as PAID`);
    } else if (type === 'payment_intent.payment_failed') {
      const rideId = data.object.metadata.rideId;
      await this.prisma.ride.update({
        where: { id: rideId },
        data: { paymentStatus: 'FAILED' },
      });
      console.log(`[Webhook] Ride ${rideId} marked as FAILED`);
    }
    
    return { received: true };
  }
}
