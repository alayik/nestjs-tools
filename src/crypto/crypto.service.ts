import * as crypto from 'crypto';
import { Global, Inject, Injectable } from '@nestjs/common';
import { CRYPTO_ALGORITHM, CRYPTO_SECRET } from './crypto.constants';

export type TextEncrypt = {
  iv: string;
  content: string;
};

@Global()
@Injectable()
export class CryptoService {
  constructor(@Inject(CRYPTO_SECRET) private readonly secret, @Inject(CRYPTO_ALGORITHM) private readonly algorithm) {}

  encrypt(text: string): TextEncrypt {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secret, initVector);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return {
      iv: initVector.toString('hex'),
      content: encrypted,
    };
  }

  decrypt(hash: TextEncrypt) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.secret, Buffer.from(hash.iv, 'hex'));

    let decrypted = decipher.update(hash.content, 'hex', 'utf-8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
