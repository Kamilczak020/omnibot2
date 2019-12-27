import { MessageDTO, MatchedDTO, ParsedDTO } from 'src/entity';
import { IParsingContext } from './parsingContext';
import { inject, injectable } from 'inversify';
import { BaseParser, IParser } from './baseParser';
import { ISplitParserConfig } from 'src/config/service/parser';
import { CONFIG_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { ParsingError } from 'src/error';
import { IParsedRepository } from 'src/repository/parsed';

export type ISplitParser = IParser;

@injectable()
export class SplitParser extends BaseParser implements ISplitParser {
  protected readonly config: ISplitParserConfig;

  public constructor(
    @inject(CONFIG_IDENTIFIER.ISplitParserConfig) config: ISplitParserConfig,
    @inject(REPOSITORY_IDENTIFIER.IParsedRepository) repository: IParsedRepository,
  ) {
    super(config, repository);
  }

  public async parse(matched: MatchedDTO) {
    const split = matched.message.body.split(this.config.behavior.separator);
    const filtered = split.slice(this.config.behavior.skip);
    if (filtered.length === 0) {
      throw new ParsingError('Tried to return an empty parsing result.');
    }

    const parsedDTO = {
      id: undefined,
      handler: matched.handler,
      parsedMessage: filtered,
      message: matched.message,
    };

    await this.repository.insert([parsedDTO]);
    return parsedDTO;
  }
}
