import { applyDecorators, CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { throwBadRequest } from '../errors/index';

@Injectable()
export class TcpTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const TcpToken = process.env.TCP_TOKEN;
    const token = request.headers['tcp'];

    if (!token || token !== TcpToken) {
      throwBadRequest();
    }

    return true;
  }
}

export function TCPGuard() {
  return applyDecorators(
    UseGuards(TcpTokenGuard),
    ApiHeader({
      name: 'tcp',
      description: 'Tcp token!',
      required: true,
    }),
  );
}
