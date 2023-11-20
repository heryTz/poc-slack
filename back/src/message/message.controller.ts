import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageResponse } from './dto/message.response';
import { FindMessageQuery } from './dto/find-message.query';
import { CreateMessageInput } from './dto/create-message.input';
import { TypingMessageInput } from './dto/typing-message.input';

@Controller('message')
@ApiTags('message')
@ApiExtraModels(CreateMessageInput, TypingMessageInput)
@UsePipes(new ValidationPipe({ transform: true }))
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('find')
  @ApiOkResponse({ type: MessageResponse, isArray: true })
  find(@Query() query: FindMessageQuery) {
    return this.messageService.find(query);
  }
}
