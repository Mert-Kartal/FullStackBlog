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
import { JwtGuard, RolesGuard } from '../shared/guards';
import { CommentService } from './comment/comment.service';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { Roles } from 'src/shared';
import { Role } from '@prisma/client';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

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

  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id/staff')
  async updatePostByStaff(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.updatePostByStaff(id, data);
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id/staff')
  async deletePostByAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.deletePostByAdmin(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return this.postService.deletePost(id, req.user!.userId);
  }

  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':id/tags/:tagId/staff')
  async addTagToPostByStaff(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.postService.addTagToPostByStaff(id, tagId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/tags/:tagId')
  async addTagToPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @Req() req: Request,
  ) {
    return this.postService.addTagToPost(id, tagId, req.user!.userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/tags/:tagId')
  async removeTagFromPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @Req() req: Request,
  ) {
    return this.postService.removeTagFromPost(id, tagId, req.user!.userId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/comments')
  async createComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.createComment(data, req.user!.userId, id);
  }

  @Get(':id/comments')
  async getComments(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentService.getComments(id);
  }

  @Get(':id/comments/:commentId')
  async getCommentById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentService.getCommentById(commentId, id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/comments/:commentId')
  async updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: UpdateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.updateComment(
      commentId,
      id,
      data,
      req.user!.userId,
    );
  }

  @Roles(Role.ADMIN, Role.MODERATOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id/comments/:commentId/staff')
  async deleteCommentByStaff(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentService.deleteCommentByStaff(commentId, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/comments/:commentId')
  async deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Req() req: Request,
  ) {
    return this.commentService.deleteComment(commentId, id, req.user!.userId);
  }
}
