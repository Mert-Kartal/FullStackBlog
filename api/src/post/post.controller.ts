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
import { CommentService } from './comment/comment.service';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}
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

  @UseGuards(JwtGuard)
  @Post(':id/comment')
  async createComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.createComment(id, req.user!.userId, data);
  }

  @Get(':id/comment')
  async getComments(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.getComments(id);
  }

  @Get(':id/comment/:commentId')
  async getComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentService.getComment(id, commentId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/comment/:commentId')
  async updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: UpdateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.updateComment(
      id,
      commentId,
      data,
      req.user!.userId,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id/comment/:commentId')
  async deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Req() req: Request,
  ) {
    return this.commentService.deleteComment(id, commentId, req.user!.userId);
  }
}
