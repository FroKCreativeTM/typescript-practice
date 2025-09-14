import { Controller, Get } from "@nestjs/common";

// 데코레이터
// 애플리케이션 안에서 컨트롤러 역할을 할 클래스를 생성하려 한다고 NestJS로 알린다.
@Controller()   
export class AppController {
    @Get()  // HTTP GET 요청을 처리하는 메서드
    getRootRoute() {
        console.warn('Root route accessed'); // 루트 경로에 접근했을 때 콘솔에 경고 메시지를 출력
        return 'Hello, World!';  // 루트 경로에 대한 응답
    }
}