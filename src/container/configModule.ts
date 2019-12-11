import { CONFIG_IDENTIFIER } from 'src/constants';
import { ContainerModule, interfaces } from 'inversify';
import { IBotConfig, TBotConfig, IMatcherConfig, TMatcherConfig } from 'src/config/models';
import { IConnectionProviderConfig, TConnectionProviderConfig } from 'src/config/models';
import { loadConfig } from 'src/config';

export const configModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IConnectionProviderConfig>(CONFIG_IDENTIFIER.IConnectionProviderConfig)
      .toConstantValue(loadConfig<IConnectionProviderConfig>(TConnectionProviderConfig, 'some/path'));

    bind<IBotConfig>(CONFIG_IDENTIFIER.IBotConfig)
      .toConstantValue(loadConfig<IBotConfig>(TBotConfig, 'some/path'));

    bind<IMatcherConfig>(CONFIG_IDENTIFIER.IMatcherConfig)
      .toConstantValue(loadConfig<IMatcherConfig>(TMatcherConfig, 'some/path'));
  },
);
