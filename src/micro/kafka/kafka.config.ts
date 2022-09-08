import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { APP_KAFKA_CLIENT } from '../micro.constants';

export type MicroServiceOptions = {
  enabled: boolean;
  clientId: string;
  brokers: string[];
  consumerGroupId: string;
  reqResTopics?: string[];
  jwtProcessTopic?: string;
  newActivityTopic?: string;
  bearerHeaderKey?: string;
};

export const GetKafkaClient = (options: MicroServiceOptions): ClientProviderOptions => {
  return {
    name: APP_KAFKA_CLIENT,
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: options.clientId,
        brokers: options.brokers,
      },
      consumer: {
        groupId: options.consumerGroupId + '-' + uuidv4(),
      },
    },
  };
};
