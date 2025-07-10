import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(data: CreateCategoryDto) {
    const existCategory = await this.categoryRepository.getCategoryByName(
      data.name,
    );
    if (existCategory) {
      throw new BadRequestException('Category already exists');
    }

    return this.categoryRepository.createCategory(data);
  }

  async getCategories() {
    return this.categoryRepository.getCategories();
  }

  async getCategoryById(id: string) {
    const existCategory = await this.categoryRepository.getCategoryById(id);
    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }
    return existCategory;
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    const existCategory = await this.categoryRepository.getCategoryById(id);
    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }
    if (data.name === existCategory.name) {
      throw new BadRequestException('Category name is the same as before');
    }
    const existCategoryByName = await this.categoryRepository.getCategoryByName(
      data.name,
    );
    if (existCategoryByName) {
      throw new BadRequestException('Category already exists');
    }
    return this.categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    const existCategory = await this.categoryRepository.getCategoryById(id);
    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.deleteCategory(id);
    return { message: 'Category deleted successfully' };
  }
}
