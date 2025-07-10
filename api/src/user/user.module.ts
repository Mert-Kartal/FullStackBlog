import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../jwt/jwt.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [PrismaModule, JwtModule],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
