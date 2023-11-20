import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserPayload } from '../interfaces/user-payload';

export interface AppSocket extends Socket {
  user: UserPayload;
}

export const GetUserWs = createParamDecorator(
  (data, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToWs().getClient<AppSocket>();
    return req.user;
  },
);
