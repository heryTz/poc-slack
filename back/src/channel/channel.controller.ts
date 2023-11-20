import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChannelResponse } from './dto/channel.response';
import { CreateChannelInput } from './dto/create-channel.input';
import { GetUser } from 'src/auth/decorator/get-user';
import { UserPayload } from 'src/auth/interfaces/user-payload';

@Controller('channel')
@ApiTags('channel')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post('create')
  @ApiOkResponse({ type: ChannelResponse })
  create(@Body() dto: CreateChannelInput, @GetUser() user: UserPayload) {
    return this.channelService.create(user.id, dto);
  }

  @Get('find')
  @ApiOkResponse({ type: ChannelResponse, isArray: true })
  find() {
    return this.channelService.find();
  }

  @Get(':id')
  @ApiOkResponse({ type: ChannelResponse })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.channelService.findOne(+id);
  }
}
