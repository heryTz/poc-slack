import { ApiProperty } from '@nestjs/swagger';

export class ChannelResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
}
