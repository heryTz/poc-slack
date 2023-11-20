import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ChannelService, PrismaClient],
  controllers: [ChannelController],
  exports: [ChannelService],
})
export class ChannelModule {}
