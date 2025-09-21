import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 생성자 타입 정의
interface ClassContructor {
    // 생성자 시그니처 정의
    new (...args: any[]): {};
}

// 커스텀 데코레이터 정의
// dto: 직렬화에 사용할 DTO 클래스 타입
export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerilizeInterceptor(dto));
}

// 직렬화 인터셉터 정의
export class SerilizeInterceptor implements NestInterceptor {
    constructor(private dto: any) {} // DTO 클래스 타입을 받는 생성자

    // 인터셉터 메서드 구현
    // context: 현재 요청에 대한 정보
    // next: 다음 핸들러 호출을 위한 객체
    // 반환 타입은 Observable<any> 또는 Promise<Observable<any>>
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // 다음 핸들러 호출 후, 응답을 가로채서 변환
        return next.handle().pipe(
            map((data: any) => {
                // plainToClass 메서드를 사용하여 데이터를 UserDto 인스턴스로 변환
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true, // Expose 데코레이터가 적용된 속성만 포함
                })
            })
        );
    }
}