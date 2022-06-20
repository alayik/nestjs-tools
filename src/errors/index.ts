import { HttpException, HttpStatus } from '@nestjs/common';

export const throwForbidden = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      message: msg || 'داده های مجوز نامعتبر مشخص شده در درخواست، یا دسترسی به منبع درخواستی ممنوع است.',
    },
    HttpStatus.FORBIDDEN,
  );
};

export const throwUnAuthorized = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      message: msg || 'اطلاعات مجوز در درخواست مشخص نشده است',
    },
    HttpStatus.UNAUTHORIZED,
  );
};

export const throwBadRequest = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: msg || 'درخواست نامعتبر',
    },
    HttpStatus.BAD_REQUEST,
  );
};

export const throwNotFound = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      message: msg || 'داده ای یافت نشد',
    },
    HttpStatus.NOT_FOUND,
  );
};

export const throwMethodNotAllowed = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: msg || 'روش دسترسی مجاز نیست',
    },
    HttpStatus.METHOD_NOT_ALLOWED,
  );
};

export const throwInternalServerError = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: msg || 'خطای سرور داخلی',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const throwServiceUnAvailable = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: msg || 'سرویس در دسترس نیست',
    },
    HttpStatus.SERVICE_UNAVAILABLE,
  );
};

export const throwUnprocessableEntity = (
  errors: { field: string; message: string }[] = [],
  msg: string | null = null,
) => {
  throw new HttpException(
    {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: msg || 'داده های ارسالی معتبر نیست',
      errors,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};
