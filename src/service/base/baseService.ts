import { IServiceConfig } from 'src/config/service/base';

export interface IService {
  getName(): string;
}

export abstract class BaseService implements IService {
  protected config: IServiceConfig;

  public constructor(config: IServiceConfig) {
    this.config = config;
  }

  public getName(): string {
    return this.config.name;
  }
}
