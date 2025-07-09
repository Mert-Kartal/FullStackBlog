import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from 'src/dto/auth.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: RegisterUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async getByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
