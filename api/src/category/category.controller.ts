import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.getCategoryById(id);
  }
}
