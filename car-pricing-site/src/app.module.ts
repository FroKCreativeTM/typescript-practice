import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [UsersModule, ReportsModule, 

    // TypeOrmModule 설정
    TypeOrmModule.forRoot({
    type: 'sqlite',                     // 사용되는 데이터베이스 종류 (sqlite는 파일형 데이터베이스이다.)
    database: 'db.sqlite',              // 데이터베이스 경로
    'entities': [User, Report],         // 엔티티 파일 경로 
    synchronize: true,                  // 애플리케이션 실행 시 데이터베이스 스키마를 엔티티에 맞게 자동 동기화 (개발 환경에서만 사용 권장)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
