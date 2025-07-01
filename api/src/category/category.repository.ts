import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
    });
  }

  async getCategoryByName(name: string) {
    return this.prisma.category.findUnique({
      where: { name, deletedAt: null },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
