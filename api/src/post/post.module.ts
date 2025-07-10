import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../jwt/jwt.module';
@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
