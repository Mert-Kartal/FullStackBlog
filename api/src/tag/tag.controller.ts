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
import { JwtGuard, RolesGuard } from '../shared/guards/';
import { Role } from '@prisma/client';
import { Roles } from 'src/shared';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  async updateTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTagDto,
  ) {
    return this.tagService.updateTag(id, data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.deleteTag(id);
  }
}
