import { MessageDTO } from 'src/entity';
import { IBaseFilterConfig } from 'src/config/service/filter';
import { IService, BaseService } from 'src/service/base';
import { injectable, unmanaged } from 'inversify';

export interface IFilter extends IService {
  filter(message: MessageDTO): Promise<boolean>;
}

@injectable()
export abstract class BaseFilter extends BaseService implements IFilter {
  protected config: IBaseFilterConfig;

  public constructor(@unmanaged() config: IBaseFilterConfig) {
    super(config);
  }

  public abstract async filter(message: MessageDTO): Promise<boolean>;
}
