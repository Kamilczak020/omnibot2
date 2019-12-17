import * as t from 'io-ts';
import { TBaseHandlerConfig } from './baseHandlerConfig';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TEchoHandlerConfig>;
export interface IEchoHandlerConfig extends T { }

export const TEchoHandlerConfig = TBaseHandlerConfig;
