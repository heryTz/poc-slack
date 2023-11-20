import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppSocket } from 'src/auth/decorator/get-user-ws';
import { AuthWsGuard } from 'src/auth/guard/auth-ws.guard';

@WebSocketGateway({ transports: ['websocket'], cors: true })
@UseGuards(AuthWsGuard)
export class EventsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    console.log('disconnect', client.user);
  }

  @SubscribeMessage('setup_room')
  handleSetupRoom(@ConnectedSocket() socket: AppSocket) {
    socket.join(`user_${socket.user.id}`);
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: any) {
    console.log({ data });
  }
}
