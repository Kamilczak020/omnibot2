import * as t from 'io-ts';
import { TServiceConfig } from 'src/config/service';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TBaseParserConfig>;
export interface IBaseParserConfig extends T { }

export const TBaseParserConfig = TServiceConfig;
