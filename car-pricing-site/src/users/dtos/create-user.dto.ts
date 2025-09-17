import { IsEmail, IsString } from 'class-validator';

// 유저 생성 DTO (Data Transfer Object)
export class CreateUserDto {
    // 유저 이메일
    @IsEmail()               // 이메일 형식 검증
    email: string;

    // 유저 비밀번호
    @IsString()              // 문자열 형식 검증
    password: string;
}