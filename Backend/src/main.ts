import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('GoRush API')
    .setDescription('The GoRush ride-hailing backend API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accessible at http://localhost:4000/api

  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
