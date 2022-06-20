import { Logger } from '@nestjs/common';

export const paginationQuery = (page?: string, take?: string): { skip: number; take: number } => {
  let pageNum = 1;
  let takeNum = 25;

  try {
    if (page) {
      pageNum = parseInt(page, 10);
    }
    if (take) {
      takeNum = parseInt(take, 10);
    }
  } catch (error) {
    Logger.error('Error in paginationQuery: ', error);
  }

  if (!take)
    return {
      skip: (pageNum - 1) * takeNum,
      take: takeNum,
    };
};
