import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindMessageQuery {
  @ApiPropertyOptional()
  @Type(() => Number)
  channelId?: number;
  @ApiPropertyOptional()
  @Type(() => Number)
  receiverId?: number;
}
