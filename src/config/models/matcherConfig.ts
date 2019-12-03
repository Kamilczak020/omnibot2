import * as t from 'io-ts';
import { regexp } from 'io-ts-types/lib/regexp';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TMatcherConfig>;
export interface IMatcherConfig extends T { }

export const TMatchingRule = t.type({
  test: t.union([regexp, t.string]),
  parser: t.string,
  handler: t.string,
});

export const TMatcherConfig = t.type({
  name: t.string,
  rules: t.array(TMatchingRule),
});
