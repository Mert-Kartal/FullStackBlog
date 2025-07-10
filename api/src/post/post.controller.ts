import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { JwtGuard } from '../jwt/guard/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createPost(@Body() data: CreatePostDto, @Req() req: Request) {
    return this.postService.createPost(data, req.user!.userId);
  }

  @Get()
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.deletePost(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/tags/:tagId')
  async addTagToPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.postService.addTagToPost(id, tagId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/tags/:tagId')
  async removeTagFromPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.postService.removeTagFromPost(id, tagId);
  }
}
