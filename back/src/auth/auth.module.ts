import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UtilModule } from 'src/util/util.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule, UtilModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
