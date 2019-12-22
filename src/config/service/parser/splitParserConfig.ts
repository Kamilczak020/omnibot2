import * as t from 'io-ts';
import { TBaseParserConfig } from './baseParserConfig';

/* tslint:disable: no-empty-interface */
type T = t.TypeOf<typeof TSplitParserConfig>;
export interface ISplitParserConfig extends T { }

export const TSplitBehavior = t.type({
  separator: t.string,
  skip: t.number,
});

export const TSplitParserConfig = t.intersection([
  TBaseParserConfig,
  t.type({
    behavior: TSplitBehavior,
  })]);
