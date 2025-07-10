import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getPostByTitle(title: string) {
    return this.prisma.post.findMany({
      where: { title, deletedAt: null },
      include: {
        category: true,
        tag: true,
      },
    });
  }

  async getPosts() {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        tag: true,
      },
    });
  }

  async getPostById(id: string) {
    return this.prisma.post.findUnique({
      where: { id, deletedAt: null },
      include: {
        category: true,
        tag: true,
      },
    });
  }

  async updatePost(id: string, data: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id, deletedAt: null },
      data,
      include: {
        category: true,
        tag: true,
      },
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
      include: {
        category: true,
      },
    });
  }

  async addTagToPost(id: string, tagId: string) {
    return this.prisma.postTag.create({
      data: { postId: id, tagId },
    });
  }
}
