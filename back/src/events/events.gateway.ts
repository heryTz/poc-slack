import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from '@prisma/client';
import { Server } from 'socket.io';
import { AppSocket, GetUserWs } from 'src/auth/decorator/get-user-ws';
import { AuthWsGuard } from 'src/auth/guard/auth-ws.guard';
import { UserPayload } from 'src/auth/interfaces/user-payload';
import { ChannelService } from 'src/channel/channel.service';
import { CreateMessageInput } from 'src/message/dto/create-message.input';
import { TypingMessageInput } from 'src/message/dto/typing-message.input';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({ cors: true })
@UseGuards(AuthWsGuard)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
  ) {}

  @SubscribeMessage('setup_room')
  async handleSetupRoom(@ConnectedSocket() socket: AppSocket) {
    socket.join(`user_${socket.user.id}`);
    const channels = await this.channelService.find();
    channels.forEach((el) => {
      socket.join(`channel_${el.id}`);
    });
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: CreateMessageInput,
    @GetUserWs() user: UserPayload,
  ) {
    const message = await this.messageService.create(user.id, data);
    const room = this.getRoomMessage(message);
    this.server
      .to([`user_${message.authorId}`, room])
      .emit(`send_message`, message);
  }

  @SubscribeMessage('typing_message')
  async handleTypingMessage(@MessageBody() data: TypingMessageInput) {
    const room = this.getRoomMessage(data);
    this.server.to(room).emit(`typing_message`);
  }

  @SubscribeMessage('end_typing_message')
  async handleEndTypingMessage(@MessageBody() data: TypingMessageInput) {
    const room = this.getRoomMessage(data);
    this.server.to(room).emit(`end_typing_message`);
  }

  private getRoomMessage(
    message: Partial<Pick<Message, 'receiverId' | 'channelId'>>,
  ) {
    return message.receiverId
      ? `user_${message.receiverId}`
      : `channel_${message.channelId}`;
  }
}
