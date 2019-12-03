import * as t from 'io-ts';
import { regexp } from 'io-ts-types/lib/regexp';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TMockConfig>;
export interface IMockConfig extends T { }

export const TConfigRule = t.type({
  test: t.union([regexp, t.string]),
  parser: t.string,
  handler: t.string,
});

export const TMockConfig = t.type({
  name: t.string,
  rules: t.array(TConfigRule),
});
