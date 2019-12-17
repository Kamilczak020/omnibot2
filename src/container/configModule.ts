import * as path from 'path';
import { loadConfig } from 'src/config';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { ContainerModule, interfaces } from 'inversify';
import { IBotConfig, TBotConfig } from 'src/config/bot';
import { IMatcherConfig, TMatcherConfig } from 'src/config/service/matcher';
import { IEchoParserConfig, TEchoParserConfig, ISplitParserConfig, TSplitParserConfig } from 'src/config/service/parser';
import { IWordFilterConfig, TWordFilterConfig } from 'src/config/service/filter/wordFilterConfig';
import { IEchoHandlerConfig, TEchoHandlerConfig } from 'src/config/service/handler';

export const configModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IBotConfig>(CONFIG_IDENTIFIER.IBotConfig)
      .toConstantValue(loadConfig<IBotConfig>(TBotConfig, './build/botConfig.yml'));

    bind<IMatcherConfig>(CONFIG_IDENTIFIER.IMatcherConfig)
      .toConstantValue(loadConfig<IMatcherConfig>(TMatcherConfig, './build/matcherConfig.yml'));

    bind<IWordFilterConfig>(CONFIG_IDENTIFIER.IWordFilterConfig)
      .toConstantValue(loadConfig<IWordFilterConfig>(TWordFilterConfig, './build/wordFilterConfig.yml'));

    bind<IEchoParserConfig>(CONFIG_IDENTIFIER.IEchoParserConfig)
      .toConstantValue(loadConfig<IEchoParserConfig>(TEchoParserConfig, './build/echoParserConfig.yml'));

    bind<ISplitParserConfig>(CONFIG_IDENTIFIER.ISplitParserConfig)
      .toConstantValue(loadConfig<ISplitParserConfig>(TSplitParserConfig, './build/splitParserConfig.yml'));

    bind<IEchoHandlerConfig>(CONFIG_IDENTIFIER.IEchoHandlerConfig)
      .toConstantValue(loadConfig<IEchoHandlerConfig>(TEchoHandlerConfig, './build/echoHandlerConfig.yml'));
  },
);
