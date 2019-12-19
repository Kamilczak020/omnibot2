import { injectable, inject } from 'inversify';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { MessageDTO } from 'src/entity';
import { IFilter, BaseFilter } from './baseFilter';
import { IUserFilterConfig } from 'src/config/service/filter';
import { isEmpty } from 'lodash';

type IUserFilter = IFilter;

@injectable()
export class UserFilter extends BaseFilter implements IUserFilter {
  protected config: IUserFilterConfig;

  public constructor(@inject(CONFIG_IDENTIFIER.IUserFilterConfig) config: IUserFilterConfig) {
    super(config);
  }

  public async filter(message: MessageDTO): Promise<boolean> {
    const result = this.config.userlist.filter((user) => user === message.author);
    if (isEmpty(result)) {
      return false;
    }

    return true;
  }
}
