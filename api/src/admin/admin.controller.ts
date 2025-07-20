import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { JwtGuard, Roles, RolesGuard } from '../shared';
import { Role } from '@prisma/client';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';
import { TagService } from '../tag/tag.service';
import { PostService } from '../post/post.service';
import { UpdatePostDto } from '../dto/post.dto';

@Controller('admin')
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly postService: PostService,
  ) {}

  @Post('categories')
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Patch('categories/:id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Post('tags')
  async createTag(@Body() data: CreateTagDto) {
    return this.tagService.createTag(data);
  }

  @Patch('tags/:id')
  async updateTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTagDto,
  ) {
    return this.tagService.updateTag(id, data);
  }

  @Delete('tags/:id')
  async deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }

  @Patch('posts/:id')
  async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, data);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.deletePost(id);
  }
}
