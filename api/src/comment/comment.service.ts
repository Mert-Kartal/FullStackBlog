import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  private async checkPost(postId: string) {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  async createComment(data: CreateCommentDto, userId: string, postId: string) {
    await this.checkPost(postId);

    const comment = await this.commentRepository.createComment(
      data,
      userId,
      postId,
    );
    return {
      message: 'Comment created successfully',
      data: comment,
    };
  }

  async getComments(postId: string) {
    await this.checkPost(postId);

    const comments = await this.commentRepository.getComments(postId);
    if (comments.length === 0) {
      throw new NotFoundException('No comments found');
    }

    return {
      message: 'Comments fetched successfully',
      data: comments,
    };
  }

  async getCommentById(id: string, postId: string) {
    await this.checkPost(postId);

    const comment = await this.commentRepository.getCommentById(id, postId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return {
      message: 'Comment fetched successfully',
      data: comment,
    };
  }

  async updateComment(id: string, postId: string, data: UpdateCommentDto) {
    await this.getCommentById(id, postId);

    const comment = await this.commentRepository.updateComment(
      id,
      postId,
      data,
    );
    return {
      message: 'Comment updated successfully',
      data: comment,
    };
  }

  async deleteComment(id: string, postId: string) {
    await this.getCommentById(id, postId);

    await this.commentRepository.deleteComment(id, postId);
    return {
      message: 'Comment deleted successfully',
    };
  }
}
