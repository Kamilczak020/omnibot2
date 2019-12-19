import * as t from 'io-ts';
import { TBaseFilterConfig } from './baseFilterConfig';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TUserFilterConfig>;
export interface IUserFilterConfig extends T { }

export const TUserFilterConfig = t.intersection([
  TBaseFilterConfig,
  t.type({
    userlist: t.array(t.string),
  }),
]);
