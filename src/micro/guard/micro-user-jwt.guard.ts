import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { throwUnAuthorized } from '../../errors';
import { KafkaProxy, MicroServiceOptions } from '../kafka';
import { MICROSERVICE_CONFIGS } from '../micro.constants';

@Injectable()
export class MicroUserJwtGuard implements CanActivate {
  constructor(
    @Inject(MICROSERVICE_CONFIGS) private readonly configs: MicroServiceOptions,
    private readonly kafkaProxy: KafkaProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.getArgByIndex(0);

      const Authorization = request.headers[this.configs.bearerHeaderKey || 'authorization'];

      if (!Authorization) {
        throwUnAuthorized();
      }

      const token = Authorization.replace('Bearer ', '');

      if (token) {
        const user = await this.kafkaProxy.send(this.configs.jwtProcessTopic || 'auth.user.jwt.validate', token);

        if (Boolean(user)) {
          request['user'] = user;
          return true;
        }
      }
    } catch (error) {
      Logger.error(error.message, 'MicroUserJwtGuard');
      return false;
    }

    return false;
  }
}
