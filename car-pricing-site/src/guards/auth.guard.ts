import {
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// 인증 가드
// 사용자가 인증되었는지 확인
// 인증되지 않은 사용자는 특정 경로에 접근하지 못하도록 막음
// 예: 로그인하지 않은 사용자가 보호된 경로에 접근하는 것을 방지
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

         // 세션에 userId가 있으면 인증된 사용자로 간주
         // userId가 없으면 인증되지 않은 사용자로 간주 (null, undefined, 0, 빈 문자열 등은 false로 평가됨)
        return request.session.userId; 
    }
}