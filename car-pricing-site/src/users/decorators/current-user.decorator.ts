import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

// 데코레이터와 인터셉터를 둘 다 활용하여 현재 로그인한 사용자의 정보를 가져오는 예시
// CurrentUser 데코레이터는 현재 요청의 컨텍스트에서 사용자 정보를 추출하는 역할을 함
export const CurrentUser = createParamDecorator(
    // 1. data: any - 데코레이터에 전달된 데이터 (여기서는 사용하지 않음)
    // never: 데코레이터에 전달된 데이터가 없음을 명시
    // 2. context: ExecutionContext - 현재 요청에 대한 컨텍스트 정보
    // ExecutionContext는 NestJS에서 제공하는 인터페이스로, 현재 실행 중인 요청에 대한 정보를 담고 있음
    // 다양한 타입의 요청(웹소켓, GraphQL, gRPC 등)을 받기 위해서 HTTP가 아닌 ExecutionContext 사용
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    },
);