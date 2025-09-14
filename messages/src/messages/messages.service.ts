import { MessagesRepository } from "./messages.repository";

export class MessagesService {
    messagesRepository: MessagesRepository;

    constructor() {
        // 서비스는 레포지토리를 주입받는다.
        // 아래는 임시 코드!
        this.messagesRepository = new MessagesRepository();
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