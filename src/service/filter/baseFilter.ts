import { MessageDTO } from 'src/entity';
import { IBaseFilterConfig } from 'src/config/service/filter';
import { IService, BaseService } from 'src/service/base';

export interface IFilter extends IService {
  filter(message: MessageDTO): Promise<boolean>;
}

export abstract class BaseFilter extends BaseService implements IFilter {
  protected config: IBaseFilterConfig;

  public constructor(config: IBaseFilterConfig) {
    super(config);
  }

  public abstract async filter(message: MessageDTO): Promise<boolean>;
}
