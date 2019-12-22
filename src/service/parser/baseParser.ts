import { MessageDTO } from 'src/entity';
import { IMatchingContext } from 'src/config/service/matcher';
import { IBaseParserConfig } from 'src/config/service/parser';
import { IService, BaseService } from 'src/service/base';
import { IParsingContext } from './parsingContext';
import { injectable, unmanaged } from 'inversify';

export interface IParser extends IService {
  parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext];
}

@injectable()
export abstract class BaseParser extends BaseService implements IParser {
  protected config: IBaseParserConfig;

  public constructor(@unmanaged() config: IBaseParserConfig) {
    super(config);
  }

  public abstract parse(message: MessageDTO, context: IMatchingContext): [MessageDTO, IParsingContext];
}
