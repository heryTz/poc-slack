import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';
import { EventsModule } from './events/events.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    UtilModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/', // https://stackoverflow.com/questions/68019001/how-to-get-serve-static-images-nestjs
    }),
    MessageModule,
    EventsModule,
    ChannelModule,
  ],
})
export class AppModule {}
