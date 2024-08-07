export enum Databases {
  SQLITE = 'sqlite',
  POSTGRES = 'postgres',
}

export type DbType = 'sqlite' | 'postgres';

export const APIMessages = {
  SUCCESS: 'Success',
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};
