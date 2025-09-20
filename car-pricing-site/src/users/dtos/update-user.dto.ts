import { IsEmail, IsString, IsOptional } from 'class-validator';

// 유저 업데이트 DTO (Data Transfer Object)
export class UpdateUserDto {
    // email은 선택적 필드
    @IsEmail()
    @IsOptional()   
    email?: string;

    // password는 선택적 필드
    @IsString()
    @IsOptional()
    password?: string;
}