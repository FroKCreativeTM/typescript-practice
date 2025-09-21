import { Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Query, 
    Patch, 
    Delete, 
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor 
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import  { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { SerilizeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

// 유저와 관련된 요청을 처리하는 컨트롤러
@Controller('auth')
@Serialize(UserDto) // 커스텀 데코레이터 사용 (모든 메서드에 일괄 적용)
export class UsersController {
    // UsersService를 주입
    constructor(private usersService: UsersService,
        private authService: AuthService
    ) {}

    // POST /auth/signup 요청을 처리하는 메서드
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {   // 요청 본문을 CreateUserDto 타입으로 검증
        this.authService.signup(body.email, body.password);
    }

    // POST /auth/signin 요청을 처리하는 메서드
    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }

    // GET /auth/:id 요청을 처리하는 메서드
    @Get(':id')
    findUser(@Param('id') id: string) {
        // nestjs는 id를 문자열로 받기 때문에, 숫자로 변환 필요(자동 변환 X)
        const user = this.usersService.findOne(parseInt(id));        
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    // GET ?email= 요청을 처리하는 메서드
    @UseInterceptors(ClassSerializerInterceptor) // 응답 직렬화 인터셉터 적용
    @Get()
    findAllUsers(@Query('email') email: string) {
        const users = this.usersService.find(email);

        if (!users) {
            throw new NotFoundException('user not found');
        }
        
        return users;
    }
    
    // PATCH /auth/:id 요청을 처리하는 메서드
    // 중요 - 부분 업데이트를 위해 Partial<UpdateUserDto> 사용
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
        return this.usersService.update(parseInt(id), body);
    }

    // DELETE /auth/:id 요청을 처리하는 메서드
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
}
