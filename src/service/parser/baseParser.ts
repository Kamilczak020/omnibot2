import { MessageDTO } from 'src/entity';
import { IMatchingContext } from 'src/config/matcher';
import { IBaseParserConfig } from 'src/config/parser';
import { IService, BaseService } from 'src/service/base';
import { IParsingContext } from './parsingContext';

export interface IParser extends IService {
  parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext];
}

export abstract class BaseParser extends BaseService implements IParser {
  protected config: IBaseParserConfig;

  public constructor(config: IBaseParserConfig) {
    super(config);
  }

  public abstract parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext];
}
