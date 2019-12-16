import { ContainerModule, interfaces } from 'inversify';
import { SERVICE_IDENTIFIER } from 'src/constants';
import { IBot, Bot } from 'src/bot';
import { ILogger, Logger } from 'src/logger';
import { Client } from 'discord.js';
import { IMatcher, Matcher } from 'src/service/matcher';
import { IParser, EchoParser, SplitParser } from 'src/service/parser';
import { IFilter, WordFilter } from 'src/service/filter';
import { IHandler, EchoHandler } from 'src/service/handler';

export const serviceModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<ILogger>(SERVICE_IDENTIFIER.ILogger)
      .to(Logger)
      .inSingletonScope();

    bind<IMatcher>(SERVICE_IDENTIFIER.IMatcher)
      .to(Matcher)
      .inRequestScope();

    bind<IParser>(SERVICE_IDENTIFIER.IParser)
      .to(EchoParser)
      .inRequestScope();

    bind<IParser>(SERVICE_IDENTIFIER.IParser)
      .to(SplitParser)
      .inRequestScope();

    bind<IFilter>(SERVICE_IDENTIFIER.IFilter)
      .to(WordFilter)
      .inRequestScope();

    bind<IHandler>(SERVICE_IDENTIFIER.IHandler)
      .to(EchoHandler)
      .inRequestScope();

    bind<Client>(SERVICE_IDENTIFIER.DiscordClient)
      .toConstantValue(new Client());

    bind<IBot>(SERVICE_IDENTIFIER.IBot)
      .to(Bot)
      .inSingletonScope();
  },
);
