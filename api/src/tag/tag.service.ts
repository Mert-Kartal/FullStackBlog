import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(data: CreateTagDto) {
    const existTag = await this.tagRepository.getTagByName(data.name);
    if (existTag) {
      throw new BadRequestException('Tag already exists');
    }
    const createdTag = await this.tagRepository.createTag(data);
    return {
      message: 'Tag created successfully',
      data: createdTag,
    };
  }

  async getTags() {
    const tags = await this.tagRepository.getTags();
    return {
      message: 'Tags fetched successfully',
      data: tags,
    };
  }

  async getTagById(id: string) {
    const existTag = await this.tagRepository.getTagById(id);
    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    return {
      message: 'Tag fetched successfully',
      data: existTag,
    };
  }

  async updateTag(id: string, data: UpdateTagDto) {
    const existTag = await this.tagRepository.getTagById(id);
    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    if (data.name === existTag.name) {
      throw new BadRequestException('Tag name is the same as before');
    }
    const existTagByName = await this.tagRepository.getTagByName(data.name);
    if (existTagByName) {
      throw new BadRequestException('Tag already exists');
    }
    const updatedTag = await this.tagRepository.updateTag(id, data);
    return {
      message: 'Tag updated successfully',
      data: updatedTag,
    };
  }

  async deleteTag(id: string) {
    const existTag = await this.tagRepository.getTagById(id);
    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    await this.tagRepository.deleteTag(id);
    return { message: 'Tag deleted successfully' };
  }
}
