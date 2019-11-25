import 'reflect-metadata';
import { Container } from 'inversify';
import { IBot, Bot } from 'src/core/bot';
import { ILogger, Logger } from 'src/logger';
import { SERVICE_IDENTIFIER } from 'src/constants/identifiers';
import { Client } from 'discord.js';

const container = new Container();

container.bind<IBot>(SERVICE_IDENTIFIER.IBot).to(Bot).inSingletonScope();
container.bind<Client>(SERVICE_IDENTIFIER.DiscordClient).toConstantValue(new Client());
container.bind<string>(SERVICE_IDENTIFIER.DiscordToken).toConstantValue(process.env.DISCORD_TOKEN);

container.bind<ILogger>(SERVICE_IDENTIFIER.ILogger).to(Logger).inSingletonScope();

export default container;
