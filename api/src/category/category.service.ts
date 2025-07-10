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

    const createdCategory = await this.categoryRepository.createCategory(data);
    return {
      message: 'Category created successfully',
      data: createdCategory,
    };
  }

  async getCategories() {
    const categories = await this.categoryRepository.getCategories();
    if (categories.length === 0) {
      throw new NotFoundException('Categories not found');
    }
    return {
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  async getCategoryById(id: string) {
    const existCategory = await this.categoryRepository.getCategoryById(id);
    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }
    return {
      message: 'Category fetched successfully',
      data: existCategory,
    };
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
    const updatedCategory = this.categoryRepository.updateCategory(id, data);
    return {
      message: 'Category updated successfully',
      data: updatedCategory,
    };
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
