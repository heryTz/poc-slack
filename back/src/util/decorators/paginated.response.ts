import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  data: T[];
  @ApiProperty()
  count: number;
  @ApiProperty()
  total: number;
}
