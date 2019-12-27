import { MessageDTO } from 'src/entity';
import { IMockFilterConfig } from './mockConfig';
import { IFilter, BaseFilter } from 'src/service/filter';
import { IFilteredRepository } from 'src/repository/filtered';

export type IMockFilter = IFilter;

export class MockFilter extends BaseFilter implements IMockFilter {
  protected readonly config: IMockFilterConfig;

  public constructor(config: IMockFilterConfig, repository: IFilteredRepository) {
    super(config, repository);
  }

  public async filter(message: MessageDTO): Promise<boolean> {
    return true;
  }
}
