import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), UtilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
