import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NegociosModule } from './negocios.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NegociosModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 4000,
      },
    },
  );
  await app.listen();
}
bootstrap();
