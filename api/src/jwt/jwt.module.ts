import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtGuard } from './guard/jwt.guard';
@Module({
  imports: [PrismaModule],
  providers: [JwtService, JwtGuard],
  exports: [JwtService, JwtGuard],
})
export class JwtModule {}
