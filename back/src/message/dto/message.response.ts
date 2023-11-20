import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/dto/user.response';

export class MessageResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({ type: UserResponse })
  Author: UserResponse;
}
