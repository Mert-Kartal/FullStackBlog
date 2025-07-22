import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from '../../dto/comment.dto';
import { CommentRepository } from './comment.repository';
import { PostService } from '../post.service';
import { UserService } from '../../user/user.service';
@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  private async checkComment(postId: string, id: string) {
    const comment = await this.commentRepository.show(postId, id);
    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async createComment(postId: string, userId: string, data: CreateCommentDto) {
    await this.postService.checkPost(postId);
    const user = await this.userService.checkUserById(userId);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }
    const comment = await this.commentRepository.create(postId, userId, data);
    return {
      message: 'Comment created successfully',
      data: comment,
    };
  }

  async getComments(postId: string) {
    await this.postService.checkPost(postId);
    const comments = await this.commentRepository.index(postId);
    return {
      message: 'Comments fetched successfully',
      data: comments,
    };
  }

  async getComment(postId: string, id: string) {
    await this.postService.checkPost(postId);
    const comment = await this.checkComment(postId, id);
    return {
      message: 'Comment fetched successfully',
      data: comment,
    };
  }

  async updateComment(
    postId: string,
    id: string,
    data: UpdateCommentDto,
    userId: string,
  ) {
    const post = await this.postService.checkPost(postId);
    const comment = await this.checkComment(postId, id);
    if (comment.userId !== userId && userId !== post.userId) {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }
    const updatedComment = await this.commentRepository.update(
      postId,
      id,
      data,
    );
    return {
      message: 'Comment updated successfully',
      data: updatedComment,
    };
  }

  async deleteComment(postId: string, id: string, userId?: string) {
    const post = await this.postService.checkPost(postId);
    const comment = await this.checkComment(postId, id);

    if (userId && comment.userId !== userId && userId !== post.userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }

    await this.commentRepository.delete(postId, id);
    return {
      message: 'Comment deleted successfully',
    };
  }
}
