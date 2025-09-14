import { MessagesRepository } from "./messages.repository";

// @Injectable 데코레이터는 이 클래스가 NestJS의 의존성 주입 시스템에 의해 관리되는 서비스임을 나타낸다.
// 이 데코레이터를 사용하면 다른 클래스에서 이 서비스를 주입받아 사용할 수 있다.
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    // public을 붙이면 이 인수가 자동으로 속성으로서 선언된다.
    constructor(public messagesRepository: MessagesRepository) {
    }

    async findOne(id: string) {
        return this.messagesRepository.findOne(id);
    }

    async findAll() {
        return this.messagesRepository.findAll();
    }

    async create(message: string) {
        return this.messagesRepository.create(message);
    }
}