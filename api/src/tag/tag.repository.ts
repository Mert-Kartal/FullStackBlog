import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(data: CreateTagDto) {
    return this.prisma.tag.create({
      data,
    });
  }

  async getTagByName(name: string) {
    return this.prisma.tag.findUnique({
      where: { name },
      include: {
        post: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async getTags() {
    return this.prisma.tag.findMany({});
  }

  async getTagById(id: string) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
        post: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async updateTag(id: string, data: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data,
      include: {
        post: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async deleteTag(id: string) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
