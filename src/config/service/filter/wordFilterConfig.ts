import * as t from 'io-ts';
import { TBaseFilterConfig } from './baseFilterConfig';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TWordFilterConfig>;
export interface IWordFilterConfig extends T { }

export const TWordFilterConfig = t.intersection([
  TBaseFilterConfig,
  t.type({
    wordlist: t.array(t.string),
  }),
]);
