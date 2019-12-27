import { IEchoParserConfig } from 'src/config/service/parser';
import { IParser, BaseParser } from './baseParser';
import { injectable, inject } from 'inversify';
import { CONFIG_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { MessageDTO, MatchedDTO } from 'src/entity';
import { IParsingContext } from './parsingContext';
import { IParsedRepository } from 'src/repository/parsed';

export type IEchoParser = IParser;

@injectable()
export class EchoParser extends BaseParser implements IEchoParser {
  protected config: IEchoParserConfig;

  public constructor(
    @inject(CONFIG_IDENTIFIER.IEchoParserConfig) config: IEchoParserConfig,
    @inject(REPOSITORY_IDENTIFIER.IParsedRepository) repository: IParsedRepository,
  ) {
    super(config, repository);
  }

  public async parse(matched: MatchedDTO) {
    const parsedDTO = {
      id: undefined,
      handler: matched.handler,
      parsedMessage: [matched.message.body],
      message: matched.message,
    };

    await this.repository.insert([parsedDTO]);
    return parsedDTO;
  }
}
