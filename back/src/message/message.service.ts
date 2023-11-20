import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { FindMessageQuery } from './dto/find-message.query';
import { MessageResponse } from './dto/message.response';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, dto: CreateMessageInput) {
    const message = await this.prisma.message.create({
      data: { authorId, ...dto },
    });
    await this.prisma.messageRead.create({
      data: { userId: authorId, messageId: message.id },
    });
    return message;
  }

  async find(
    authorId: number,
    query: FindMessageQuery,
  ): Promise<MessageResponse[]> {
    const receiverId = query.receiverId;
    let channelId = query.channelId;
    if (channelId === 0) {
      const firstChannel = await this.prisma.channel.findFirst();
      if (!firstChannel) throw new BadRequestException();
      channelId = firstChannel.id;
    }

    if (!channelId && !receiverId) throw new BadRequestException();

    let where = {};
    if (channelId) where = { channelId: +channelId };
    else if (receiverId) where = { receiverId: +receiverId };

    return this.prisma.message.findMany({
      where: { ...where, authorId },
      include: { Author: { select: { id: true, name: true, email: true } } },
    });
  }
}
