import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { CommentRepository } from './comment/comment.repository';
import { CommentService } from './comment/comment.service';
@Module({
  imports: [PrismaModule, SharedModule, TagModule, CategoryModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentRepository, CommentService],
})
export class PostModule {}
