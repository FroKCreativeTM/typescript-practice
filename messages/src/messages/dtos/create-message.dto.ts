// IsString도 데코레이터이다.
// class-validator 라이브러리에서 제공하는 데코레이터로, 
// 해당 속성이 문자열인지 검증하는 역할을 한다.
import { IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a message.
 */
export class CreateMessageDto {
    @IsString()
    content: string;
}