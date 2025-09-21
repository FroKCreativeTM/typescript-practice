import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
  providers: [
    UsersService, 
    AuthService,
    // 전역 인터셉터로 CurrentUserInterceptor 등록
    // 이렇게 하면 모든 컨트롤러에서 CurrentUserInterceptor가 적용됨
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }],
})
export class UsersModule {}
