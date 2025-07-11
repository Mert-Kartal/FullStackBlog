import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createComment(data: CreateCommentDto, userId: string, postId: string) {
    return this.prisma.comment.create({
      data: {
        ...data,
        userId,
        postId,
      },
    });
  }

  async getComments(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });
  }

  async getCommentById(id: string, postId: string) {
    return this.prisma.comment.findUnique({
      where: { id, postId },
      include: {
        user: true,
      },
    });
  }

  async updateComment(id: string, postId: string, data: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id, postId },
      data,
    });
  }

  async deleteComment(id: string, postId: string) {
    return this.prisma.comment.update({
      where: { id, postId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

/*
yorum oluştur
yorumları getir
yorumu getir
yorumu güncelle
yorumu sil
*/
