import { Module } from '@nestjs/common';
import { JwtGuard, RolesGuard } from './guards';
import { Roles } from './decorators';
@Module({
  providers: [JwtGuard, RolesGuard],
  exports: [JwtGuard, RolesGuard, Roles],
})
export class SharedModule {}
