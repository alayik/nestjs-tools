import { Global, Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule as MicroClientsModule } from '@nestjs/microservices';
import { MicroUserJwtGuard } from './guard';
import { GetKafkaClient, KafkaProxy, MicroServiceOptions } from './kafka';
import { APP_KAFKA_CLIENT, MICROSERVICE_CONFIGS } from './micro.constants';

@Global()
@Module({})
export class MicroServiceModule {
  static register(kafkaOptions: MicroServiceOptions, anotherClients: ClientProviderOptions[] = []) {
    let options = this.getCleanedOptions(kafkaOptions);
    return {
      module: MicroServiceModule,
      imports: [MicroClientsModule.register([GetKafkaClient(options), ...anotherClients])],
      providers: [
        {
          useFactory: () => {
            return options;
          },
          provide: MICROSERVICE_CONFIGS,
        },
        KafkaProxy,
        MicroUserJwtGuard,
      ],
      exports: [KafkaProxy, MicroUserJwtGuard, APP_KAFKA_CLIENT, MICROSERVICE_CONFIGS],
    };
  }

  static getCleanedOptions(kafkaOptions: MicroServiceOptions) {
    let options = kafkaOptions;

    if (options.bearerHeaderKey) {
      options.bearerHeaderKey = 'authorization';
    }
    if (options.jwtProcessTopic) {
      options.jwtProcessTopic = 'auth.user.jwt.validate';
    }
    if (options.newActivityTopic) {
      options.newActivityTopic = 'activity.submit.new';
    }

    return options;
  }
}
