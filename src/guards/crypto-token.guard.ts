import * as moment from 'moment';

import { ApiHeader } from '@nestjs/swagger';
import { throwInvalidToken } from '../errors';
import { isValidObjectId } from '../helpers';

import { Injectable, CanActivate, ExecutionContext, applyDecorators, UseGuards } from '@nestjs/common';
import { CryptoService } from 'src/crypto';

@Injectable()
export class CryptoTokenGuard implements CanActivate {
  constructor(private readonly crypto: CryptoService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['token'];

    if (!token) {
      throwInvalidToken();
    }

    try {
      request['deviceToken'] = token;
      request['deviceId'] = this.parseToken(token);
    } catch (error) {
      throwInvalidToken();
    }

    return true;
  }

  parseToken(token: string) {
    const splits = token.split('-');

    if (!splits || !splits[0] || splits.length !== 5) {
      throwInvalidToken();
    }

    let deviceId;
    let expiresAt;

    const deviceIdCrypto = {
      iv: splits[0],
      content: splits[1],
    };
    deviceId = this.crypto.decrypt(deviceIdCrypto);
    if (!deviceId || !isValidObjectId(deviceId)) {
      throwInvalidToken();
    }

    const expiresAtCrypto = {
      iv: splits[3],
      content: splits[4],
    };
    expiresAt = moment(this.crypto.decrypt(expiresAtCrypto)).toDate();
    if (expiresAt < new Date()) {
      throwInvalidToken();
    }

    return deviceId;
  }
}

export function CryptoGuard() {
  return applyDecorators(
    UseGuards(CryptoTokenGuard),
    ApiHeader({
      name: 'token',
      description: 'device access token',
      required: true,
    }),
  );
}
