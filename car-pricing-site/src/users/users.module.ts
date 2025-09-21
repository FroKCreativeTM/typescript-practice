import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // 모듈 내에서 사용할 서비스와 인터셉터를 providers 배열에 등록
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}
