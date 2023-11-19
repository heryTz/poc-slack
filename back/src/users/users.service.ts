import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException(`user not found`);
    return user;
  }

  async create({ email, name }: CreateUserInput) {
    const exist = await this.prisma.user.count({ where: { email } });
    if (exist) throw new ConflictException();
    return this.prisma.user.create({ data: { email, name } });
  }
}
