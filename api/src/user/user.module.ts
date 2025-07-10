import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '../jwt/jwt.module';
@Module({
  imports: [PrismaModule, JwtModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
