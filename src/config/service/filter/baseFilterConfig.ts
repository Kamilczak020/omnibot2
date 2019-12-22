import * as t from 'io-ts';
import { TServiceConfig } from 'src/config/service/base';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TBaseFilterConfig>;
export interface IBaseFilterConfig extends T { }

export const TBaseFilterConfig = TServiceConfig;
