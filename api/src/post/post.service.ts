import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(data: CreatePostDto, userId: string) {
    return this.postRepository.createPost(data, userId);
  }

  async getPosts() {
    return this.postRepository.getPosts();
  }

  async getPostById(id: string) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    return existPost;
  }

  async updatePost(id: string, data: UpdatePostDto) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.updatePost(id, data);
  }

  async deletePost(id: string) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.deletePost(id);
  }
}
