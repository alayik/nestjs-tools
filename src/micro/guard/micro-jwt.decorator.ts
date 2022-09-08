import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MicroUserJwtGuard } from './micro-user-jwt.guard';

export function MicroJwtGuard() {
  return applyDecorators(UseGuards(MicroUserJwtGuard), ApiBearerAuth());
}
