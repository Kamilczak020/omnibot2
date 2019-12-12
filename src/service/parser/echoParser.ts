import { IEchoParserConfig } from 'src/config/parser';
import { IParser, BaseParser } from './baseParser';
import { injectable, inject } from 'inversify';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { IMatchingContext } from 'src/config/matcher';
import { MessageDTO } from 'src/entity';
import { IParsingContext } from './parsingContext';

export type IEchoParser = IParser;

@injectable()
export class EchoParser extends BaseParser implements IEchoParser {
  protected config: IEchoParserConfig;

  public constructor(@inject(CONFIG_IDENTIFIER.IEchoParserConfig) config: IEchoParserConfig) {
    super(config);
  }

  public parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext] {
    return [message, { handler: context.handler, parsedMessage: message.body }];
  }
}
