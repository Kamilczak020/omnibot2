import { CONFIG_IDENTIFIER } from 'src/constants';
import { ContainerModule, interfaces } from 'inversify';
import { IBotConfig, TBotConfig } from 'src/config/bot';
import { IMatcherConfig, TMatcherConfig } from 'src/config/matcher';
import { IEchoParserConfig, TEchoParserConfig } from 'src/config/parser';
import { IConnectionProviderConfig, TConnectionProviderConfig } from 'src/config/database';
import { loadConfig } from 'src/config';

export const configModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IConnectionProviderConfig>(CONFIG_IDENTIFIER.IConnectionProviderConfig)
      .toConstantValue(loadConfig<IConnectionProviderConfig>(TConnectionProviderConfig, 'some/path'));

    bind<IBotConfig>(CONFIG_IDENTIFIER.IBotConfig)
      .toConstantValue(loadConfig<IBotConfig>(TBotConfig, 'some/path'));

    bind<IMatcherConfig>(CONFIG_IDENTIFIER.IMatcherConfig)
      .toConstantValue(loadConfig<IMatcherConfig>(TMatcherConfig, 'some/path'));

    bind<IEchoParserConfig>(CONFIG_IDENTIFIER.IEchoParserConfig)
      .toConstantValue(loadConfig<IEchoParserConfig>(TEchoParserConfig, 'some/path'));
  },
);
