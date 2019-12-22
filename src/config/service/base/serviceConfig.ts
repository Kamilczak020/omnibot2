import * as t from 'io-ts';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TServiceConfig>;
export interface IServiceConfig extends T { }

export const TServiceConfig = t.type({
  name: t.string,
});
