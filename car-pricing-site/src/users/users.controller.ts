import { Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Query, 
    Patch, 
    Delete, 
    NotFoundException,
    Session,
    UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import  { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

// 유저와 관련된 요청을 처리하는 컨트롤러
@Controller('auth')
@Serialize(UserDto) // 커스텀 데코레이터 사용 (모든 메서드에 일괄 적용)
export class UsersController {
    // UsersService를 주입
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    // POST /auth/signup 요청을 처리하는 메서드
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {   // 요청 본문을 CreateUserDto 타입으로 검증
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;  // 세션에 userId 저장
        return user;
    }

    // POST /auth/signin 요청을 처리하는 메서드
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;  // 세션에 userId 저장
        return user;
    }

    // // GET /auth/whoami 요청을 처리하는 메서드
    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     // 세션에서 userId를 사용하여 현재 로그인한 사용자 정보 반환
    //     return this.usersService.findOne(session.userId);
    // }

    // 만약 데코레이터 없이 인터셉터만으로 구현한다면?
    // @Get('/whoami')
    // whoAmI(@Request() req: any) {
    //     return req.currentUser;
    // }

    // 데코레이터 + 인터셉터 활용
    @Get('/whoami')
    @UseGuards(AuthGuard) // 인증 가드 적용
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    // POST /auth/signout 요청을 처리하는 메서드
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null; // 세션에서 userId 제거
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
