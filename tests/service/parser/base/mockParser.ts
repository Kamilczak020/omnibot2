import { MessageDTO } from 'src/entity';
import { IMatchingContext } from 'src/config/matcher';
import { IParser, BaseParser, IParsingContext } from 'src/service/parser';
import { IMockParserConfig } from './mockConfig';

export type IMockParser = IParser;

export class MockParser extends BaseParser implements IMockParser {
  protected readonly config: IMockParserConfig;

  public constructor(config: IMockParserConfig) {
    super(config);
  }

  public parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext] {
    return [message, { handler: context.handler, parsedMessage: ['test'] }];
  }
}
