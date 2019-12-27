import { MessageDTO } from 'src/entity';
import { IBaseFilterConfig } from 'src/config/service/filter';
import { IService, BaseService } from 'src/service/base';
import { injectable, unmanaged, inject } from 'inversify';
import { IFilteredRepository } from 'src/repository/filtered';
import { REPOSITORY_IDENTIFIER } from 'src/constants';

export interface IFilter extends IService {
  filter(message: MessageDTO): Promise<boolean>;
}

@injectable()
export abstract class BaseFilter extends BaseService implements IFilter {
  protected config: IBaseFilterConfig;
  protected repository: IFilteredRepository;

  public constructor(
    @unmanaged() config: IBaseFilterConfig,
    @unmanaged() repository: IFilteredRepository,
  ) {
    super(config);
    this.repository = repository;
  }

  public abstract async filter(message: MessageDTO): Promise<boolean>;
}
