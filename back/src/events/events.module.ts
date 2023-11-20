import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChannelModule } from 'src/channel/channel.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule,
    ChannelModule,
    MessageModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
