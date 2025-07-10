import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';
import { JwtGuard } from '../jwt/guard/jwt.guard';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createTag(@Body() data: CreateTagDto) {
    return this.tagService.createTag(data);
  }

  @Get()
  async getTags() {
    return this.tagService.getTags();
  }

  @Get(':id')
  async getTagById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.getTagById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTagDto,
  ) {
    return this.tagService.updateTag(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }
}
