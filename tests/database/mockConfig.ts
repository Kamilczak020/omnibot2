import { IConnectionProviderConfig } from 'src/config/database';

export const mockConfig: IConnectionProviderConfig = {
  type: 'postgres',
  host: 'test',
  port: 1,
  username: 'test',
  password: 'test',
  database: 'test',
};
