import { Global, Module } from '@nestjs/common';
import { Sha256DefaultConfig } from './sha256.configs';
import { Sha256Service } from './sha256.service';
import { SHA256_PART_ONE, SHA256_PART_TWO, SHA256_SECRET } from './sha256.constants';

@Global()
@Module({})
export class Sha256Module {
  static register(options?: { secret: string; partOne?: string; partTwo?: string }) {
    const secret = options?.secret || Sha256DefaultConfig.secret;
    let partOne = '';
    let partTwo = '';

    try {
      partOne = options?.partOne || secret.split('.')[0];
    } catch (error) {
      console.log(error.message);
      partOne = '';
    }

    try {
      partTwo = options?.partTwo || secret.split('.')[1];
    } catch (error) {
      console.log(error.message);
      partTwo = '';
    }

    return {
      module: Sha256Module,
      providers: [
        {
          useFactory: () => {
            return secret;
          },
          provide: SHA256_SECRET,
        },
        {
          useFactory: () => {
            return partOne;
          },
          provide: SHA256_PART_ONE,
        },
        {
          useFactory: () => {
            return partTwo;
          },
          provide: SHA256_PART_TWO,
        },
        Sha256Service,
      ],
      exports: [Sha256Service, SHA256_SECRET, SHA256_PART_ONE, SHA256_PART_TWO],
    };
  }
}
