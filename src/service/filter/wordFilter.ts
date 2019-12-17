import { injectable, inject } from 'inversify';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { MessageDTO } from 'src/entity';
import { IFilter, BaseFilter } from './baseFilter';
import { IWordFilterConfig } from 'src/config/service/filter/wordFilterConfig';
import { isEmpty } from 'lodash';

export type IWordFilter = IFilter;

@injectable()
export class WordFilter extends BaseFilter implements IWordFilter {
  protected config: IWordFilterConfig;

  public constructor(@inject(CONFIG_IDENTIFIER.IWordFilterConfig) config: IWordFilterConfig) {
    super(config);
  }

  public async filter(message: MessageDTO): Promise<boolean> {
    const words = message.body.split(' ');
    const bad = words.filter((word) => this.config.wordlist.indexOf(word) !== -1);
    if (isEmpty(bad)) {
      return false;
    }

    return true;
  }
}
