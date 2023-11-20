import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindMessageQuery {
  @ApiPropertyOptional()
  channelId?: number;
  @ApiPropertyOptional()
  receiverId?: number;
}
