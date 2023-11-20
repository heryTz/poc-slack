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
import { GetUser } from 'src/auth/decorator/get-user';
import { UserPayload } from 'src/auth/interfaces/user-payload';

@Controller('message')
@ApiTags('message')
@ApiExtraModels(CreateMessageInput, TypingMessageInput)
@UsePipes(new ValidationPipe({ transform: true }))
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('find')
  @ApiOkResponse({ type: MessageResponse, isArray: true })
  find(@Query() query: FindMessageQuery, @GetUser() user: UserPayload) {
    return this.messageService.find(user.id, query);
  }
}
