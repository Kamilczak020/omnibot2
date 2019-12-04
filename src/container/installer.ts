import 'reflect-metadata';
import { Container } from 'inversify';
import { IBot, Bot } from 'src/core/bot';
import { ILogger, Logger } from 'src/logger';
import { Client } from 'discord.js';
import { loadConfig } from 'src/config/loader';
import { IMatcherConfig, TMatcherConfig } from 'src/config/models';
import { CONFIG_IDENTIFIER, CONST_IDENTIFIER, SERVICE_IDENTIFIER } from 'src/constants';

const container = new Container();

/* Services */
container.bind<IBot>(SERVICE_IDENTIFIER.IBot).to(Bot).inSingletonScope();
container.bind<Client>(SERVICE_IDENTIFIER.DiscordClient).toConstantValue(new Client());
container.bind<ILogger>(SERVICE_IDENTIFIER.ILogger).to(Logger).inSingletonScope();

/* Env */
container.bind<string>(CONST_IDENTIFIER.DiscordToken).toConstantValue(process.env.DISCORD_TOKEN);

/* Configs */
container.bind<IMatcherConfig>(CONFIG_IDENTIFIER.IMatcherConfig).toConstantValue(loadConfig<IMatcherConfig>(TMatcherConfig, 'some/path'));

export default container;
