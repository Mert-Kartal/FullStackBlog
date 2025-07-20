import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags() {
    return this.tagService.getTags();
  }

  @Get(':id')
  async getTagById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.getTagById(id);
  }
}
