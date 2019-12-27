import { MessageDTO, MatchedDTO, ParsedDTO } from 'src/entity';
import { IBaseParserConfig } from 'src/config/service/parser';
import { IService, BaseService } from 'src/service/base';
import { IParsingContext } from './parsingContext';
import { injectable, unmanaged } from 'inversify';
import { IParsedRepository } from 'src/repository/parsed';

export interface IParser extends IService {
  parse(matched: MatchedDTO): Promise<ParsedDTO>;
}

@injectable()
export abstract class BaseParser extends BaseService implements IParser {
  protected config: IBaseParserConfig;
  protected repository: IParsedRepository;

  public constructor(
    @unmanaged() config: IBaseParserConfig,
    @unmanaged() repository: IParsedRepository,
  ) {
    super(config);
    this.repository = repository;
  }

  public async abstract parse(matched: MatchedDTO): Promise<ParsedDTO>;
}
