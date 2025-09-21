import { Expose, Exclude } from 'class-transformer';

// UserDto 클래스는 사용자 데이터를 전송할 때 사용되는 데이터 전송 객체(DTO)입니다.
// Expose 데코레이터를 사용하여 직렬화 시 포함할 속성을 지정합니다.
export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}