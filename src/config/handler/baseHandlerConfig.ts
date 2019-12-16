import * as t from 'io-ts';
import { TServiceConfig } from 'src/config/service';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TBaseHandlerConfig>;
export interface IBaseHandlerConfig extends T { }

export const TBaseHandlerConfig = t.intersection([
  TServiceConfig,
  t.type({
    color: t.string,
  }),
]);
