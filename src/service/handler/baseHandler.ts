import { MessageDTO } from 'src/entity';
import { IService, BaseService } from 'src/service/base';
import { IParsingContext } from 'src/service/parser';
import { IBaseHandlerConfig } from 'src/config/service/handler';
import { IHandlingContext } from './handlingContext';
import { injectable, unmanaged } from 'inversify';

export interface IHandler extends IService {
  handle(message: MessageDTO, context: IParsingContext): Promise<[MessageDTO, IHandlingContext]>;
}

@injectable()
export abstract class BaseHandler extends BaseService implements IHandler {
  protected config: IBaseHandlerConfig;

  public constructor(@unmanaged() config: IBaseHandlerConfig) {
    super(config);
  }

  public abstract async handle(message: MessageDTO, context: IParsingContext): Promise<[MessageDTO, IHandlingContext]>;
}
