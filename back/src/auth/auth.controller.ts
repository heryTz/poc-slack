import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninInput } from './dto/signin.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { UserResponse } from '../users/dto/user.response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VerifyOtpResponse } from './dto/verify-otp.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOkResponse({ type: UserResponse })
  signin(@Body() dto: SigninInput) {
    return this.authService.signin(dto.email);
  }

  @Post('signup')
  @ApiOkResponse({ type: UserResponse })
  signup(@Body() dto: CreateUserInput) {
    return this.authService.signup(dto);
  }

  @Post('verifyOtp')
  @ApiOkResponse({ type: VerifyOtpResponse })
  verifyOtp(@Body() dto: VerifyOtpInput) {
    return this.authService.verifyOtp(dto);
  }
}
