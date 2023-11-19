import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export type UserPayload = Pick<User, 'id' | 'email'>;

export interface RequestWithUserPayload extends Request {
  user: UserPayload;
}

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToHttp().getRequest<RequestWithUserPayload>();
    return req.user;
  },
);
