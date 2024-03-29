import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../interfaces/user-payload';

export interface AppRequest extends Request {
  user: UserPayload;
}

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToHttp().getRequest<AppRequest>();
    return req.user;
  },
);
