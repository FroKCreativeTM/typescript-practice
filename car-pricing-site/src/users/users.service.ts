import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    // 데코레이터 중 하나
    // TypeORM의 Repository 패턴을 사용하여 User 엔티티에 대한 데이터베이스 작업을 수행
    // 의존성 주입을 통해 User 엔티티에 대한 Repository 인스턴스를 주입
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    // 사용자 생성
    create(email: string, password: string) {
        // User 엔티티의 인스턴스를 생성하고, 이를 데이터베이스에 저장
        const user = this.repo.create({ email, password });

        // save vs insert
        // insert는 데이터베이스에 직접 삽입, 후크가 실행되지 않음 (디버깅이 힘듦)
        // save는 엔티티를 데이터베이스에 저장, 후크가 실행됨 (디버깅이 용이)
        // 아래는 insert 예시
        // return this.repo.save({ email, password });

        // save 메서드는 비동기 작업이므로, 실제로는 Promise를 반환
        return this.repo.save(user);
    }

    // id로 사용자 찾기
    findOne(id: number) {
        // findOneBy는 특정 조건에 맞는 단일 엔티티를 찾을 때 사용
        if(!id) { 
            return null; 
        }

        // 주의: null을 주면 제일 첫 번째 엔티티를 반환
        return this.repo.findOneBy({ id });
    }

    // email로 사용자 찾기
    find(email: string) {
        // find는 조건에 맞는 모든 엔티티를 배열로 반환
        return this.repo.find({ where: { email } });
    }

    // 사용자 업데이트
    // attrs는 Partial<User> 타입으로, User 엔티티의 일부 속성만 포함할 수 있음
    // Partial<T>는 TypeScript의 유틸리티 타입으로, T 타입의 모든 속성을 선택적으로 만듦
    async update(id: number, attrs: Partial<User>) {
        // 먼저 해당 id를 가진 사용자가 존재하는지 확인
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Object.assign을 사용하여 기존 사용자 객체에 attrs 객체의 속성을 덮어씀
        Object.assign(user, attrs);

        // save vs update
        // update는 데이터베이스에 직접 업데이트, 후크가 실행되지 않음 (디버깅이 힘듦)
        // save는 엔티티를 데이터베이스에 저장, 후크가 실행됨 (디버깅이 용이)
        // 아래는 update 예시
        // return this.repo.update(id, attrs);

        // 변경된 사용자 객체를 데이터베이스에 저장
        return this.repo.save(user);
    }

    // 사용자 삭제
    async remove(id: number) {
        // 먼저 해당 id를 가진 사용자가 존재하는지 확인
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // remove vs delete
        // delete는 데이터베이스에서 직접 삭제, 후크가 실행되지 않음 (디버깅이 힘듦)
        // remove는 엔티티를 데이터베이스에서 제거, 후크가 실행됨 (디버깅이 용이)
        // 아래는 delete 예시
        // return this.repo.delete(id);
        
        // 존재하는 경우, 해당 사용자 객체를 데이터베이스에서 제거
        return this.repo.remove(user);
    }
}
