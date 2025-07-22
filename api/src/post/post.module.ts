import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { CommentService } from './comment/comment.service';
import { CommentRepository } from './comment/comment.repository';
@Module({
  imports: [PrismaModule, SharedModule, UserModule, CategoryModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentService, CommentRepository],
  exports: [PostService, CommentService],
})
export class PostModule {}
