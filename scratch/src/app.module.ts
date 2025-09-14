import { Module } from "@nestjs/common";
import { AppController } from "./app.controller"; // AppController를 가져온다

// 어플리케이션이 시작될 때마다 Nest는 이 모듈을 확인하고
// 여기 나열된 모든 컨트롤러를 검색한 뒤, 모든 컨트롤러 인스턴스를 자동으로 생성한다.
@Module({
    controllers: [AppController] // 모듈에 포함될 컨트롤러를 지정
})
export class AppModule {}