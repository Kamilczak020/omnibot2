import * as t from 'io-ts';
import { TBaseFilterConfig } from 'src/config/filter';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TWordFilterConfig>;
export interface IWordFilterConfig extends T { }

export const TWordFilterConfig = t.intersection([
  TBaseFilterConfig,
  t.type({
    wordlist: t.array(t.string),
  }),
]);
