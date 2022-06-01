import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export const Helmet = helmet();

export const Compression = compression();

export const Morgan = morgan((tokens: any, req: any, res: any) => {
  const log = `${tokens.method(req, res)} | ${tokens.status(req, res)} | ${tokens['response-time'](
    req,
    res,
  )}ms | ${tokens.url(req, res)}`;

  Logger.log(log, 'MorganLogger');
});

export const Json = json({ limit: '5mb' });

export const Urlencoded = urlencoded({ extended: true, limit: '5mb' });

export class UseMainMiddlewares {
  static use(app: NestExpressApplication) {
    app.use(Helmet);
    app.use(Compression);
    app.use(Morgan);
    app.use(Json);
    app.use(Urlencoded);
  }
}
