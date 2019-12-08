import * as t from 'io-ts';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TConnectionProviderConfig>;
export interface IConnectionProviderConfig extends T { }

export const TConnectionProviderConfig = t.type({
  type: t.keyof({
    mysql: undefined,
    mariadb: undefined,
    postgres: undefined,
    sqlite: undefined,
  }),
  host: t.string,
  port: t.number,
  username: t.string,
  password: t.string,
  database: t.string,
});
