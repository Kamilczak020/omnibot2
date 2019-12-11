import * as t from 'io-ts';
import { regexp } from 'io-ts-types/lib/regexp';

/* tslint:disable: no-empty-interface */
type T1 = t.TypeOf<typeof TMatcherConfig>;
export interface IMatcherConfig extends T1 { }

type T2 = t.TypeOf<typeof TMachingContext>;
export interface IMatchingContext extends T2 { }

export const TMachingContext = t.type({
  parser: t.string,
  handler: t.string,
});

export const TMatchingRule = t.type({
  test: t.union([t.string, regexp]),
  strategy: t.keyof({
    ['first-word']: undefined,
    ['any']: undefined,
  }),
  context: TMachingContext,
});

export const TMatcherConfig = t.type({
  name: t.string,
  rules: t.array(TMatchingRule),
});
