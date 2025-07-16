import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async index() {
    return this.prisma.post.findMany();
  }

  async show(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
        comment: true,
        tag: true,
      },
    });
  }

  async update(id: string, data: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
