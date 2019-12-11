import { ContainerModule, interfaces } from 'inversify';
import { SERVICE_IDENTIFIER } from 'src/constants';
import { IBot, Bot } from 'src/core/bot';
import { ILogger, Logger } from 'src/logger';
import { Client } from 'discord.js';
import { IMatcher, Matcher } from 'src/service/matcher';

export const serviceModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<ILogger>(SERVICE_IDENTIFIER.ILogger)
      .to(Logger)
      .inSingletonScope();

    bind<IMatcher>(SERVICE_IDENTIFIER.IMatcher)
      .to(Matcher)
      .inRequestScope();

    bind<Client>(SERVICE_IDENTIFIER.DiscordClient)
      .toConstantValue(new Client());

    bind<IBot>(SERVICE_IDENTIFIER.IBot)
      .to(Bot)
      .inSingletonScope();
  },
);
