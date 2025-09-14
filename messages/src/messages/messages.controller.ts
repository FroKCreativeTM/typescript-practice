import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service';
import { NotFoundException} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
        // 컨트롤러는 서비스를 주입받는다.
        // 아래는 임시 코드!
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages() { 
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) { 
        console.log(body);

        this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) { 
        const message = await this.messagesService.findOne(id);

        if(!message) {
            throw new NotFoundException('message not found');
        }

        return message;
    }
}