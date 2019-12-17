import { CONFIG_IDENTIFIER } from 'src/constants';
import { ContainerModule, interfaces } from 'inversify';
import { IBotConfig, TBotConfig } from 'src/config/bot';
import { IMatcherConfig, TMatcherConfig } from 'src/config/service/matcher';
import { IEchoParserConfig, TEchoParserConfig, ISplitParserConfig, TSplitParserConfig } from 'src/config/service/parser';
import { IConnectionProviderConfig, TConnectionProviderConfig } from 'src/config/database';
import { loadConfig } from 'src/config';
import { IWordFilterConfig, TWordFilterConfig } from 'src/config/service/filter/wordFilterConfig';
import { IEchoHandlerConfig, TEchoHandlerConfig } from 'src/config/service/handler';

export const configModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IConnectionProviderConfig>(CONFIG_IDENTIFIER.IConnectionProviderConfig)
      .toConstantValue(loadConfig<IConnectionProviderConfig>(TConnectionProviderConfig, 'some/path'));

    bind<IBotConfig>(CONFIG_IDENTIFIER.IBotConfig)
      .toConstantValue(loadConfig<IBotConfig>(TBotConfig, 'some/path'));

    bind<IMatcherConfig>(CONFIG_IDENTIFIER.IMatcherConfig)
      .toConstantValue(loadConfig<IMatcherConfig>(TMatcherConfig, 'some/path'));

    bind<IWordFilterConfig>(CONFIG_IDENTIFIER.IWordFilterConfig)
      .toConstantValue(loadConfig<IWordFilterConfig>(TWordFilterConfig, 'some/path'));

    bind<IEchoParserConfig>(CONFIG_IDENTIFIER.IEchoParserConfig)
      .toConstantValue(loadConfig<IEchoParserConfig>(TEchoParserConfig, 'some/path'));

    bind<ISplitParserConfig>(CONFIG_IDENTIFIER.ISplitParserConfig)
      .toConstantValue(loadConfig<ISplitParserConfig>(TSplitParserConfig, 'some/path'));

    bind<IEchoHandlerConfig>(CONFIG_IDENTIFIER.IEchoHandlerConfig)
      .toConstantValue(loadConfig<IEchoHandlerConfig>(TEchoHandlerConfig, 'some/path'));
  },
);
