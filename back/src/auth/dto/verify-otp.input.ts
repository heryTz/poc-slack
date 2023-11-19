import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyOtpInput {
  @ApiProperty()
  @IsNotEmpty()
  otp: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
