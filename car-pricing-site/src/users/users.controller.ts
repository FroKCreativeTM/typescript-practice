import { Controller, Get, Post, Body } from '@nestjs/common';
import  { CreateUserDto } from './dtos/create-user.dto';

// 유저와 관련된 요청을 처리하는 컨트롤러
@Controller('auth')
export class UsersController {
    // POST /auth/signup 요청을 처리하는 메서드
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {   // 요청 본문을 CreateUserDto 타입으로 검증
        console.log(body);
    }

    @Get(':id')
    findUser() {

    }


}
