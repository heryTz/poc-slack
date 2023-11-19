import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/dto/user.response';

export class VerifyOtpResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty({ type: UserResponse })
  data: UserResponse;
}
