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
    return this.tagRepository.createTag(data);
  }

  async getTags() {
    return this.tagRepository.getTags();
  }

  async getTagById(id: string) {
    const existTag = await this.tagRepository.getTagById(id);
    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    return existTag;
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
    return this.tagRepository.updateTag(id, data);
  }

  async deleteTag(id: string) {
    const existTag = await this.tagRepository.getTagById(id);
    if (!existTag) {
      throw new NotFoundException('Tag not found');
    }
    return this.tagRepository.deleteTag(id);
  }
}
