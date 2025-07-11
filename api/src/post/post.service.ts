import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  async createPost(data: CreatePostDto, userId: string) {
    await this.categoryService.getCategoryById(data.categoryId);

    const createdPost = await this.postRepository.createPost(data, userId);
    return {
      message: 'Post created successfully',
      data: createdPost,
    };
  }

  async getPosts() {
    const posts = await this.postRepository.getPosts();
    if (posts.length === 0) {
      throw new NotFoundException('Posts not found');
    }
    return {
      message: 'Posts fetched successfully',
      data: posts,
    };
  }

  async getPostById(id: string) {
    const existPost = await this.postRepository.getPostById(id);
    if (!existPost || existPost.deletedAt) {
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

    await this.getPostById(id);

    const updatedPost = await this.postRepository.updatePost(id, data);
    return {
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  async deletePost(id: string) {
    await this.getPostById(id);

    await this.postRepository.deletePost(id);
    return { message: 'Post deleted successfully' };
  }

  async addTagToPost(id: string, tagId: string) {
    await this.getPostById(id);

    await this.tagService.getTagById(tagId);

    const addedTag = await this.postRepository.addTagToPost(id, tagId);
    return {
      message: 'Tag added to post successfully',
      data: addedTag,
    };
  }

  async removeTagFromPost(id: string, tagId: string) {
    await this.getPostById(id);

    await this.tagService.getTagById(tagId);

    await this.postRepository.removeTagFromPost(id, tagId);
    return {
      message: 'Tag removed from post successfully',
    };
  }
}
