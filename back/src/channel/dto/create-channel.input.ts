import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChannelInput {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
