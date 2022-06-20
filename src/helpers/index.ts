export * from './array.helper';
export * from './req.helper';
export * from './translate.helper';
export * from './prisma.helper';
export * from './string.helper';

export const entityPartial = <T>(partial: T, entity: any) => {
  return new entity(partial);
};
