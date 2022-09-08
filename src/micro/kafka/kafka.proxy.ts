import { Global, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { randomStr } from '../../helpers';
import { APP_KAFKA_CLIENT, MICROSERVICE_CONFIGS } from '../micro.constants';
import { MicroServiceOptions } from './kafka.config';

@Global()
@Injectable()
export class KafkaProxy {
  constructor(
    @Inject(APP_KAFKA_CLIENT) private readonly kafka: ClientKafka,
    @Inject(MICROSERVICE_CONFIGS) private readonly configs: MicroServiceOptions,
  ) {}

  async onModuleInit() {
    const enabledConnection = this.configs.enabled;
    const topics = this.configs.reqResTopics || [];

    if (enabledConnection && topics && topics[0]) {
      for (let index = 0; index < topics.length; index++) {
        this.kafka.subscribeToResponseOf(topics[index]);
      }
      await this.kafka.connect();
    }
  }

  async send(pattern: string, payload: any) {
    return await firstValueFrom(this.kafka.send(pattern, payload));
  }

  async emit(pattern: string, payload?: any) {
    return await this.kafka.emit(pattern, payload);
  }

  async newActivity(payload: ActivitySubmitNewType) {
    if (!payload.tracking_code) {
      payload.tracking_code = randomStr(64);
      payload.check_tracking_code = false;
    }
    return await this.kafka.emit('activity.submit.new', payload);
  }

  get client(): ClientKafka {
    return this.kafka;
  }
}
