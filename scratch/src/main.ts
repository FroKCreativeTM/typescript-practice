import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    // AppMoodule로부터 새로운 Nest 애플리케이션을 생성한다.
    const app = await NestFactory.create(AppModule);

    await app.listen(3000); // 애플리케이션을 3000번 포트에서 시작한다.
    console.log('Application is running on: http://localhost:3000'); // 애플리케이션이 시작되었음을 알리는 메시지
}

bootstrap();