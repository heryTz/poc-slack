import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { FindMessageQuery } from './dto/find-message.query';
import { PaginatedResponse } from 'src/util/decorators/paginated.response';
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
  ): Promise<PaginatedResponse<MessageResponse>> {
    const receiverId = query.receiverId;
    let channelId = query.channelId;
    if (channelId === 0) {
      const firstChannel = await this.prisma.channel.findFirst();
      if (!firstChannel) throw new BadRequestException();
      channelId = firstChannel.id;
    }

    if (!channelId && !receiverId) throw new BadRequestException();

    const where = channelId
      ? { channelId: +channelId }
      : { receiverId: +receiverId };

    const data = await this.prisma.message.findMany({
      where: { ...where, authorId },
      include: { Author: { select: { id: true, name: true, email: true } } },
    });

    return {
      data,
      count: data.length,
      total: data.length,
    };
  }
}
