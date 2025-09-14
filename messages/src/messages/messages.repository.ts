import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

// @Injectable 데코레이터는 이 클래스가 NestJS의 의존성 주입 시스템에 의해 관리되는 서비스임을 나타낸다.
// 이 데코레이터를 사용하면 다른 클래스에서 이 서비스를 주입받아 사용할 수 있다.
@Injectable()
export class MessagesRepository {
    async findOne(id: string) {
        // 파일을 읽어온다.
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        
        // id에 해당하는 메시지를 반환한다.
        return messages[id];
    }

    async findAll() {
        // 파일을 읽어온다.
        const contents = await readFile('messages.json', 'utf8')
        const messages = JSON.parse(contents);

        // 모든 메시지를 반환한다.
        return messages;
    }

    async create(message: string) {
        // 파일을 읽어온다.
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        
        // 랜덤으로 id를 생성한다.
        const id = Math.floor(Math.random() * 999);

        // 메시지를 추가한다.
        messages[id] = {id, contents: message};

        // 파일에 다시 쓴다.
        await writeFile('messages.json', JSON.stringify(messages));
    }
}