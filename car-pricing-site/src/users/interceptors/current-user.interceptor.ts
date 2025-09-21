import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

// CurrentUser 인터셉터는 요청이 처리되기 전에 현재 로그인한 사용자의 정보를 가져오는 역할을 함
// 데코레이터는 단순히 메서드에 적용되는 반면, 인터셉터는 요청-응답 사이클 전반에 걸쳐 동작
// 인터셉터는 요청을 가로채고, 수정하고, 추가 작업을 수행할 수 있음
// 이 과정에서 데코레이터를 활용해서 현재 사용자 정보를 추출할 수 있음
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if(userId) {
            // 세션에 userId가 있으면 해당 사용자의 정보를 가져와서 request 객체에 할당
            const user = this.usersService.findOne(userId);

            // 데코레이터를 통해 현재 사용자 정보를 추출할 수 있도록 request 객체에 user 속성 추가
            request.currentUser = user;
        }   
        
        return next.handle();
    }
}