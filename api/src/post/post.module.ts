import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../jwt/jwt.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
@Module({
  imports: [PrismaModule, JwtModule, TagModule, CategoryModule, CommentModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
