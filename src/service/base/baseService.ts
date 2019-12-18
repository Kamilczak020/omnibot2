import { IServiceConfig } from 'src/config/service/base';
import { injectable, unmanaged } from 'inversify';

export interface IService {
  getName(): string;
}

@injectable()
export abstract class BaseService implements IService {
  protected config: IServiceConfig;

  public constructor(@unmanaged() config: IServiceConfig) {
    this.config = config;
  }

  public getName(): string {
    return this.config.name;
  }
}
