import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { JwtGuard } from '../shared';
import { Request } from 'express';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtGuard)
  @Post()
  async createPost(@Body() data: CreatePostDto, @Req() req: Request) {
    return this.postService.createPost(req.user!.userId, data);
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
    @Req() req: Request,
  ) {
    return this.postService.updatePost(id, data, req.user!.userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return this.postService.deletePost(id, req.user!.userId);
  }
}
