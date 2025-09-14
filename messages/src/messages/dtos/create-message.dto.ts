// IsString도 데코레이터이다.
// class-validator 라이브러리에서 제공하는 데코레이터로, 
// 해당 속성이 문자열인지 검증하는 역할을 한다.
import { IsString } from 'class-validator';

/**
 * 메시지 생성 DTO (Data Transfer Object)
 * 클라이언트로부터 메시지 생성 요청 시 사용되는 데이터 구조를 정의한다.
 */
export class CreateMessageDto {
    @IsString()
    content: string;
}