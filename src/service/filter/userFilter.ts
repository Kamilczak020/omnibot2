import { injectable, inject } from 'inversify';
import { CONFIG_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { MessageDTO } from 'src/entity';
import { IFilter, BaseFilter } from './baseFilter';
import { IUserFilterConfig } from 'src/config/service/filter';
import { isEmpty } from 'lodash';
import { IFilteredRepository } from 'src/repository/filtered';
import { FilterReason } from './filterReason';

type IUserFilter = IFilter;

@injectable()
export class UserFilter extends BaseFilter implements IUserFilter {
  protected config: IUserFilterConfig;

  public constructor(
    @inject(CONFIG_IDENTIFIER.IUserFilterConfig) config: IUserFilterConfig,
    @inject(REPOSITORY_IDENTIFIER.IFilteredRepository) repository: IFilteredRepository,
  ) {
    super(config, repository);
  }

  public async filter(message: MessageDTO): Promise<boolean> {
    const result = this.config.userlist.filter((user) => user === message.author);
    if (isEmpty(result)) {
      return false;
    }

    const filteredDTO = {
      id: undefined,
      reason: FilterReason.BlacklistedUser,
      message,
    };

    await this.repository.insert([filteredDTO]);
    return true;
  }
}
