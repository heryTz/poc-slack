import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateChannelInput } from './dto/create-channel.input';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(userId: number, { name }: CreateChannelInput) {
    const count = await this.prisma.channel.count({ where: { name } });
    if (count) throw new ConflictException(`Channel alread exist`);
    return this.prisma.channel.create({ data: { userId, name } });
  }

  findOne(channelId: number) {
    return this.prisma.channel.findUnique({
      where: { id: channelId },
    });
  }

  find() {
    return this.prisma.channel.findMany();
  }
}
