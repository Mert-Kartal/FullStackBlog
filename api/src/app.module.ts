import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CategoryModule,
    PostModule,
    TagModule,
    AuthModule,
    UserModule,
    JwtModule,
    SharedModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
