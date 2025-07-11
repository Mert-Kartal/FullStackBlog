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

  async checkTagByName(name: string) {
    const existTag = await this.tagRepository.getTagByName(name);
    if (existTag) {
      throw new BadRequestException('Tag already exists');
    }
  }

  async checkTagById(id: string) {
    const tag = await this.tagRepository.getTagById(id);
    return tag ? tag : null;
  }

  async createTag(data: CreateTagDto) {
    await this.checkTagByName(data.name);

    const createdTag = await this.tagRepository.createTag(data);
    return {
      message: 'Tag created successfully',
      data: createdTag,
    };
  }

  async getTags() {
    const tags = await this.tagRepository.getTags();
    if (tags.length === 0) {
      throw new NotFoundException('Tags not found');
    }
    return {
      message: 'Tags fetched successfully',
      data: tags,
    };
  }

  async getTagById(id: string) {
    const existTag = await this.checkTagById(id);

    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    return {
      message: 'Tag fetched successfully',
      data: existTag,
    };
  }

  async updateTag(id: string, data: UpdateTagDto) {
    const existTag = await this.checkTagById(id);

    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    if (data.name === existTag.name) {
      throw new BadRequestException('Tag name is the same as before');
    }

    await this.checkTagByName(data.name);

    const updatedTag = await this.tagRepository.updateTag(id, data);
    return {
      message: 'Tag updated successfully',
      data: updatedTag,
    };
  }

  async deleteTag(id: string) {
    const existTag = await this.checkTagById(id);

    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    await this.tagRepository.deleteTag(id);
    return { message: 'Tag deleted successfully' };
  }
}
