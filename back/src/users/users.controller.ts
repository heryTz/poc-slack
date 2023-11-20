import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user.response';
import { GetUser } from 'src/auth/decorator/get-user';
import { UserPayload } from 'src/auth/interfaces/user-payload';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponse })
  me(@GetUser() user: UserPayload) {
    return this.usersService.findByEmail(user.email);
  }

  @Get('find')
  @ApiOkResponse({ type: UserResponse, isArray: true })
  find(@GetUser() user: UserPayload) {
    return this.usersService.find(user.id);
  }
}
