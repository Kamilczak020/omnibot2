import * as t from 'io-ts';
import { regexp } from 'io-ts-types/lib/regexp';
import { TServiceConfig } from 'src/config/service';
import { TMachingContext } from './matchingContext';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TMatcherConfig>;
export interface IMatcherConfig extends T { }

export const TMatchingRule = t.type({
  tests: t.array(t.union([t.string, regexp])),
  strategy: t.keyof({
    ['first-word']: undefined,
    ['any']: undefined,
  }),
  context: TMachingContext,
});

export const TMatcherConfig = t.intersection([
  TServiceConfig,
  t.type({
    rules: t.array(TMatchingRule),
  })]);
