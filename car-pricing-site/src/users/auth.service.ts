
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// scrypt를 프로미스 기반 함수로 변환
const scryptAsync = promisify(_scrypt);

// 인증 관련 로직을 여기에 구현
// 예: 로그인, 로그아웃, 토큰 발급 등
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    // 회원가입 메서드
    async signup(email: string, password: string) {
        // 이메일이 이미 존재하는지 확인
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // 비밀번호 해싱 (bcrypt 등 사용 권장)
        // 먼저 솔트를 생성
        const salt = randomBytes(8).toString('hex');

        // 솔트를 사용하여 비밀번호 해싱
        const hash = (await scryptAsync(password, salt, 32)) as Buffer;

        // 솔트랑 해시를 합쳐서 저장
        const result = salt + '.' + hash.toString('hex');

        // 유저 생성 및 저장
        const user = await this.usersService.create(email, result);

        // 생성된 유저 반환
        return user;
    }

    // 로그인 메서드
    async signin(email: string, password: string) {
        // 이메일로 사용자 찾기
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        
        // 저장된 비밀번호에서 솔트와 해시 분리
        const [salt, storedHash] = user.password.split('.');

        // 입력된 비밀번호를 같은 솔트로 해싱
        const hashBuffer = (await scryptAsync(password, salt, 32)) as Buffer;

        // 해시 비교
        if (storedHash !== hashBuffer.toString('hex')) {
            throw new BadRequestException('bad password');
        }

        // 로그인 성공 시 유저 반환
        return user;
    }
}