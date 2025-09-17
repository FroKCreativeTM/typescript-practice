import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,            // DTO에 없는 프로퍼티 제거 
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
