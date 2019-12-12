import * as t from 'io-ts';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TMachingContext>;
export interface IMatchingContext extends T { }

export const TMachingContext = t.type({
  parser: t.string,
  handler: t.string,
});
