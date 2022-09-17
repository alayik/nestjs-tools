import * as dayjs from 'dayjs';
import { Logger } from '@nestjs/common';

export * from './array.helper';
export * from './req.helper';
export * from './translate.helper';
export * from './prisma.helper';
export * from './string.helper';

export const entityPartial = <T>(partial: T, entity: any) => {
  return new entity(partial);
};

export const getSearchRgx = (search: string) => {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  return rgx(search);
};

export const getSearchOrQuery = (search: string, properties: string[]) => {
  const options = [];
  const searchRgx = getSearchRgx(search);

  for (let index = 0; index < properties.length; index++) {
    const property = properties[index];
    options.push({
      [property]: { $regex: searchRgx, $options: 'i' },
    });
  }

  return options;
};

export const getPaginationOptions = (page: number | string, limit: number | string, populate: any[] = []) => {
  return {
    page,
    limit,
    populate,
    lean: true,
    customLabels: {
      totalDocs: 'total_docs',
      docs: 'data',
      limit: 'take',
      page: 'page',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'total_pages',
      pagingCounter: 'paging_counter',
      hasPrevPage: 'has_prev_page',
      hasNextPage: 'has_next_page',
      meta: 'meta',
    },
  };
};

export const isValidObjectId = (id?: string) => {
  id = id + '';
  let len = id.length,
    valid = false;
  if (len == 12 || len == 24) {
    valid = /^[0-9a-fA-F]+$/.test(id);
  }
  return valid;
};

export const dateCleaner = (from?: string, to?: string, format = 'YYYY-MM-DD') => {
  let cleanedFrom;
  let cleanedTo;

  try {
    cleanedFrom = from ? dayjs(from, format).startOf('day').toDate() : dayjs().startOf('day').toDate();
  } catch (_) {
    cleanedFrom = dayjs().startOf('day').toDate();
    Logger.error('Date from value is invalid', 'DateCleaner');
  }

  try {
    cleanedTo = to ? dayjs(to, format).endOf('day').toDate() : dayjs().add(30, 'day').endOf('day').toDate();
  } catch (_) {
    cleanedTo = dayjs().add(30, 'day').endOf('day').toDate();
    Logger.error('Date to value is invalid', 'DateCleaner');
  }

  return {
    cleanedFrom,
    cleanedTo,
  };
};
