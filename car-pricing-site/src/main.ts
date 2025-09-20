import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,            // DTO에 없는 프로퍼티 제거 (보안 상의 이슈로, 요청 시 불필요한 데이터 차단)
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
