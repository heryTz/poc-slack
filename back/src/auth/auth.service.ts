import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UtilService } from 'src/util/util.service';
import dayjs from 'dayjs';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private utilSevice: UtilService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signin(email: string) {
    const user = await this.usersService.findByEmail(email);

    const digit = this.utilSevice.generateDigit();
    await this.prisma.user.update({
      where: { email },
      data: { otp: digit, otpExpiration: dayjs().add(1, 'hour').toDate() },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { otp, ...result } = user;
    return result;
  }

  async signup(dto: CreateUserInput) {
    await this.usersService.create(dto);
    return this.signin(dto.email);
  }

  async verifyOtp({ email, otp }: VerifyOtpInput) {
    const user = await this.prisma.user.findUnique({ where: { email, otp } });
    if (!user) throw new UnauthorizedException('otp invalid');
    if (dayjs(user.otpExpiration).isBefore(dayjs()))
      throw new UnauthorizedException();

    const data = await this.prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiration: null },
    });

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      refreshToken: 'xx', // TODO: handle refresh token rotation
      data,
    };
  }
}
