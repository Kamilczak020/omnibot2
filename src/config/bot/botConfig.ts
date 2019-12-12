import * as t from 'io-ts';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TBotConfig>;
export interface IBotConfig extends T { }

export const TBotConfig = t.type({
  token: t.string,
});
