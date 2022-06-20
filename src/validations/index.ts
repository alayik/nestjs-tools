import {
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export class Validation extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const res = {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'داده های ارسالی معتبر نیست',
          errors: [],
        };
        const response: any = e.getResponse();
        response.message.forEach((element: any) => {
          res.errors.push({
            field: element.property,
            message: Object.values(element.constraints)[0],
          });
        });
        throw new UnprocessableEntityException(res);
      }
    }
  }
}

export class UseGlobalValidationPipe {
  static use(app: NestExpressApplication) {
    app.useGlobalPipes(
      new Validation({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );
  }
}
