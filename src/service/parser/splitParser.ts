import { MessageDTO } from 'src/entity';
import { IMatchingContext } from 'src/config/matcher';
import { IParsingContext } from './parsingContext';
import { inject, injectable } from 'inversify';
import { BaseParser, IParser } from './baseParser';
import { ISplitParserConfig } from 'src/config/parser';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { ParsingError } from 'src/error';

export type ISplitParser = IParser;

@injectable()
export class SplitParser extends BaseParser implements ISplitParser {
  protected readonly config: ISplitParserConfig;

  public constructor(@inject(CONFIG_IDENTIFIER.IEchoParserConfig) config: ISplitParserConfig) {
    super(config);
  }

  public parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext] {
    const split = message.body.split(this.config.behavior.separator);
    const filtered = split.slice(this.config.behavior.skip);
    if (filtered.length === 0) {
      throw new ParsingError('Tried to return an empty parsing result.');
    }

    return [message, { handler: context.handler, parsedMessage: filtered }];
  }
}
