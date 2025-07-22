import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from '../../dto/comment.dto';
@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(postId: string, userId: string, data: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        ...data,
        postId,
        userId,
      },
    });
  }

  async index(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });
  }

  async show(postId: string, id: string) {
    return this.prisma.comment.findUnique({
      where: { id, postId },
    });
  }

  async update(postId: string, id: string, data: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id, postId },
      data,
    });
  }

  async delete(postId: string, id: string) {
    return this.prisma.comment.update({
      where: { id, postId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
