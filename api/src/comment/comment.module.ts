import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../jwt/jwt.module';
import { PostModule } from '../post/post.module';
import { CommentRepository } from './comment.repository';
@Module({
  imports: [PrismaModule, JwtModule, forwardRef(() => PostModule)],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
