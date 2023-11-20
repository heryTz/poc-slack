import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { ApiPaginatedResponse } from 'src/util/decorators/api-paginated.response';
import { MessageResponse } from './dto/message.response';
import { FindMessageQuery } from './dto/find-message.query';
import { GetUser } from 'src/auth/decorator/get-user';
import { UserPayload } from 'src/auth/interfaces/user-payload';

@Controller('message')
@ApiTags('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('find')
  @ApiPaginatedResponse(MessageResponse)
  find(@Query() query: FindMessageQuery, @GetUser() user: UserPayload) {
    return this.messageService.find(user.id, query);
  }
}
