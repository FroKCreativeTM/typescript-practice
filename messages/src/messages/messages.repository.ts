import { readFile, writeFile } from 'fs/promises';

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