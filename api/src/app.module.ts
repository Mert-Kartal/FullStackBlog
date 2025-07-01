import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, CategoryModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
