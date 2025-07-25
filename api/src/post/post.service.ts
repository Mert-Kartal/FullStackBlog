import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostRepository } from './post.repository';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async checkPost(id: string) {
    const post = await this.postRepository.show(id);

    if (!post || post.deletedAt) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  private async checkCategory(id: string) {
    const category = await this.categoryService.getCategoryById(id);
    if (!category || category.data.deletedAt) {
      throw new NotFoundException('Category not found');
    }
  }

  private async checkUser(id: string) {
    const user = await this.userService.checkUserById(id);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createPost(userId: string, data: CreatePostDto) {
    await this.checkCategory(data.categoryId);

    const post = await this.postRepository.create(userId, data);
    return {
      message: 'Post created successfully',
      data: post,
    };
  }

  async getPosts() {
    const posts = await this.postRepository.index();
    if (posts.length === 0) {
      throw new NotFoundException('Posts not found');
    }
    return {
      message: 'Posts fetched successfully',
      data: posts,
    };
  }

  async getPostById(id: string) {
    const post = await this.checkPost(id);

    return {
      message: 'Post fetched successfully',
      data: post,
    };
  }

  async updatePost(id: string, data: UpdatePostDto, userId?: string) {
    const post = await this.checkPost(id);

    if (userId) {
      await this.checkUser(userId);

      if (post.userId !== userId) {
        throw new ForbiddenException('You are not allowed to update this post');
      }
    }

    const updatedPost = await this.postRepository.update(id, data);
    return {
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  async deletePost(id: string, userId?: string) {
    const post = await this.checkPost(id);

    if (userId) {
      await this.checkUser(userId);

      if (post.userId !== userId) {
        throw new ForbiddenException('You are not allowed to delete this post');
      }
    }

    await this.postRepository.delete(id);

    return {
      message: 'Post deleted successfully',
    };
  }
}
