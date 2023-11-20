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
      include: { Author: { select: { id: true, name: true, email: true } } },
    });
    await this.prisma.messageRead.create({
      data: { userId: authorId, messageId: message.id },
    });
    return message;
  }

  async find(
    userId: number,
    query: FindMessageQuery,
  ): Promise<MessageResponse[]> {
    const { receiverId, channelId } = query;

    if (!channelId && !receiverId) throw new BadRequestException();

    let where = {};
    if (channelId) where = { channelId };
    else if (receiverId)
      where = {
        OR: [
          { receiverId, authorId: userId },
          { receiverId: userId, authorId: receiverId },
        ],
      };

    return this.prisma.message.findMany({
      where,
      include: { Author: { select: { id: true, name: true, email: true } } },
    });
  }
}
