import { Message as DiscordMessage, Client as DiscordClient } from 'discord.js';
import { SERVICE_IDENTIFIER, CONFIG_IDENTIFIER } from 'src/constants';
import { inject, injectable, multiInject } from 'inversify';
import { IBotConfig } from 'src/config/bot';
import { ILogger } from 'src/logger';
import { Subject } from 'rxjs';
import { MessageDTO } from 'src/entity';
import { IFilter } from 'src/service/filter/baseFilter';
import { IMatcher } from 'src/service/matcher';
import { IParser, IParsingContext } from 'src/service/parser';
import { IMatchingContext } from 'src/config/matcher';
import { isNil } from 'src/util';

export interface IBot {
  start(): void;
  stop(): void;
}

@injectable()
export class Bot implements IBot {
  private logger: ILogger;
  private client: DiscordClient;
  private readonly config: IBotConfig;

  private matcher: IMatcher;
  private filters: Array<IFilter>;
  private parsers: Array<IParser>;

  private incoming: Subject<MessageDTO>;
  private matched: Subject<[MessageDTO, IMatchingContext]>;
  private parsed: Subject<[MessageDTO, IParsingContext]>;

  public constructor(
    @inject(SERVICE_IDENTIFIER.ILogger) logger: ILogger,
    @inject(CONFIG_IDENTIFIER.IBotConfig) config: IBotConfig,
    @inject(SERVICE_IDENTIFIER.DiscordClient) client: DiscordClient,
    @inject(SERVICE_IDENTIFIER.IMatcher) matcher: IMatcher,
    @multiInject(SERVICE_IDENTIFIER.IFilter) filters: Array<IFilter>,
    @multiInject(SERVICE_IDENTIFIER.IParser) parsers: Array<IParser>,
  ) {
    this.logger = logger;
    this.config = config;
    this.client = client;

    this.matcher = matcher;
    this.filters = filters;
    this.parsers = parsers;

    this.logger.info('Creating bot service.');
    this.incoming = new Subject();
    this.matched = new Subject();
    this.parsed = new Subject();
  }

  /**
   * Starts the bot service, attaches event listeners and attempts
   * to log in to the discord client.
   */
  public async start() {
    this.logger.info('Starting bot service.');

    const streamError = (err: Error) => {
      this.logger.error(`${err} Bot did not handle error.`);
    };

    this.incoming.subscribe((next) => this.handleIncoming(next).catch(streamError));
    this.matched.subscribe((next) => this.handleMatched(next).catch(streamError));

    this.client.on('ready', () => this.logger.info('Discord listener is ready.'));
    this.client.on('message', (message) => this.incoming.next(this.convertDiscordMessage(message)));

    await this.client.login(this.config.token);
    await this.client.user.setPresence({ game: { name: '!listcommands' }, status: 'online' });
  }

  /**
   * Stops the bot service, completes queues and removes listeners.
   * Finally destroys the client and exits the process.
   */
  public async stop() {
    this.logger.info('Stopping bot service.');
    this.incoming.complete();

    this.client.removeAllListeners('ready');
    this.client.removeAllListeners('message');
    await this.client.destroy();
    process.exit();
  }

  /**
   * Handles an incoming message by running them through filters.
   * If filter checks pass, message is then passed to the matcher.
   * @param message message to handle
   */
  private async handleIncoming(message: MessageDTO): Promise<void> {
    const filterResults = await Promise.all(this.filters.map((filterService) => filterService.filter(message)));
    if (filterResults.reduce((prev, next) => prev && next) === false) {
      return;
    }

    try {
      const matchResult = this.matcher.match(message);
      this.matched.next(matchResult);
    } catch (error) {
      this.logger.info('Message was not matched.');
    }
  }

  /**
   * Takes a matched message and finds a correct parser,
   * then tries to parse the message.
   * @param data tuple of messageDTO and a matching context
   */
  private async handleMatched(data: [MessageDTO, IMatchingContext]): Promise<void> {
    const [message, context] = data;
    const parser = this.findParserByName(context.parser);
    if (isNil(parser)) {
      this.logger.error(`Could not find parser with the given name: ${context.parser}`);
      return;
    }

    try {
      const parsingResult = parser.parse(message, context);
      this.parsed.next(parsingResult);
    } catch (error) {
      this.logger.info('Parser could not parse message.');
    }
  }

  /**
   * Tries to find a parser with a given string name
   * @param name parser name
   */
  private findParserByName(name: string) {
    for (const parser of this.parsers) {
      if (parser.getName() === name) {
        return parser;
      }
    }
  }

  /**
   * Converts a discord message to a MessageDTO
   * @param message discord message
   */
  private convertDiscordMessage(message: DiscordMessage): MessageDTO {
    return {
      id: undefined,
      messageId: message.id,
      body: message.content,
      author: message.author.id,
      channel: message.channel.id,
      guild: message.guild.id,
      timestamp: new Date(message.createdTimestamp),
    };
  }
}
