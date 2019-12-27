import { MessageDTO, MatchedDTO, ParsedDTO } from 'src/entity';
import { IParser, BaseParser, IParsingContext } from 'src/service/parser';
import { IMockParserConfig } from './mockConfig';
import { IParsedRepository } from 'src/repository/parsed';

export type IMockParser = IParser;

export class MockParser extends BaseParser implements IMockParser {
  protected readonly config: IMockParserConfig;

  public constructor(config: IMockParserConfig, repository: IParsedRepository) {
    super(config, repository);
  }

  public async parse(matched: MatchedDTO): Promise<ParsedDTO> {
    const parsedDTO = {
      id: undefined,
      handler: matched.handler,
      parsedMessage: ['test'],
      message: matched.message,
    };

    return parsedDTO;
  }
}
