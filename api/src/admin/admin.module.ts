import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CategoryModule } from '../category/category.module';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../tag/tag.module';
import { PostModule } from '../post/post.module';
@Module({
  imports: [CategoryModule, SharedModule, TagModule, PostModule],
  controllers: [AdminController],
})
export class AdminModule {}
