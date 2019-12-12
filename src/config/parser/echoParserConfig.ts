import * as t from 'io-ts';
import { TBaseParserConfig } from './baseParserConfig';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TEchoParserConfig>;
export interface IEchoParserConfig extends T { }

export const TEchoParserConfig = TBaseParserConfig;
