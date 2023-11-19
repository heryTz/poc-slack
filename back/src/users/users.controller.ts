import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user.response';
import { GetUser, UserPayload } from 'src/auth/decorator/get-user';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponse })
  me(@GetUser() user: UserPayload) {
    return this.usersService.findByEmail(user.email);
  }
}
