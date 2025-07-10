import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(data: CreatePostDto, userId: string) {
    const createdPost = await this.postRepository.createPost(data, userId);
    return {
      message: 'Post created successfully',
      data: createdPost,
    };
  }

  async getPosts() {
    const posts = await this.postRepository.getPosts();
    return {
      message: 'Posts fetched successfully',
      data: posts,
    };
  }

  async getPostById(id: string) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    return {
      message: 'Post fetched successfully',
      data: existPost,
    };
  }

  async updatePost(id: string, data: UpdatePostDto) {
    const hasData =
      data.title !== undefined ||
      data.content !== undefined ||
      data.categoryId !== undefined;

    if (!hasData) {
      throw new BadRequestException('No data provided');
    }

    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    const updatedPost = await this.postRepository.updatePost(id, data);
    return {
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  async deletePost(id: string) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    await this.postRepository.deletePost(id);
    return { message: 'Post deleted successfully' };
  }
}
