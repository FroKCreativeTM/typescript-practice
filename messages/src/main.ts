import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(
    // 어플리케이션에 들어오는 모든 요청에 대한 유효성을 검사한다.
    new ValidationPipe()
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
