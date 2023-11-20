import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageInput {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
  @ApiPropertyOptional()
  @IsOptional()
  receiverId?: number;
  @ApiPropertyOptional()
  @IsOptional()
  channelId: number;
}
