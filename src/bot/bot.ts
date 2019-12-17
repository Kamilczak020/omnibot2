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
import { IMatchingContext } from 'src/config/service/matcher';
import { isNil } from 'src/util';
import { IHandler } from 'src/service/handler';
import { IHandlingContext } from 'src/service/handler/handlingContext';
import { IClientController } from 'src/client/clientController';

export interface IBot {
  start(): void;
  stop(): void;
}

@injectable()
export class Bot implements IBot {
  private logger: ILogger;
  private readonly config: IBotConfig;
  private clientController: IClientController;

  private matcher: IMatcher;
  private filters: Array<IFilter>;
  private parsers: Array<IParser>;
  private handlers: Array<IHandler>;

  private incoming: Subject<MessageDTO>;
  private matched: Subject<[MessageDTO, IMatchingContext]>;
  private parsed: Subject<[MessageDTO, IParsingContext]>;
  private outgoing: Subject<[MessageDTO, IHandlingContext]>;

  public constructor(
    @inject(SERVICE_IDENTIFIER.ILogger) logger: ILogger,
    @inject(CONFIG_IDENTIFIER.IBotConfig) config: IBotConfig,
    @inject(SERVICE_IDENTIFIER.IClientController) client: IClientController,
    @inject(SERVICE_IDENTIFIER.IMatcher) matcher: IMatcher,
    @multiInject(SERVICE_IDENTIFIER.IFilter) filters: Array<IFilter>,
    @multiInject(SERVICE_IDENTIFIER.IParser) parsers: Array<IParser>,
    @multiInject(SERVICE_IDENTIFIER.IHandler) handlers: Array<IHandler>,
  ) {
    this.logger = logger;
    this.config = config;
    this.clientController = this.clientController;

    this.matcher = matcher;
    this.filters = filters;
    this.parsers = parsers;
    this.handlers = handlers;

    this.logger.info('Creating bot service.');
    this.incoming = new Subject();
    this.matched = new Subject();
    this.parsed = new Subject();
    this.outgoing = new Subject();
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
    this.parsed.subscribe((next) => this.handleParsed(next).catch(streamError));
    this.outgoing.subscribe((next) => this.handleOutgoing(next).catch(streamError));

    this.clientController.attachHandler('ready', () => this.logger.info('Discord listener is ready.'));
    this.clientController.attachHandler('message', (message: DiscordMessage) => this.incoming.next(this.convertDiscordMessage(message)));

    await this.clientController.login(this.config.token);
    await this.clientController.setPresence({ game: { name: '!listcommands' }, status: 'online' });
  }

  /**
   * Stops the bot service, completes queues and removes listeners.
   * Finally destroys the client and exits the process.
   */
  public async stop() {
    this.logger.info('Stopping bot service.');
    this.incoming.complete();

    this.clientController.removeAllListeners(['ready', 'message']);
    await this.clientController.destroy();
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
    const parser = this.getParserByName(context.parser);
    if (isNil(parser)) {
      this.logger.error(`Could not find parser with the given name: ${context.parser}`);
      return;
    }

    try {
      const parsingResult = parser.parse(message, context);
      this.parsed.next(parsingResult);
    } catch (error) {
      this.logger.info(`Parser could not parse message: ${error}`);
    }
  }

  /**
   * Takes a parsed message and finds a correct handler,
   * then tries to handle the message accordingly.
   * @param data tuple of messageDTO and a parsing context
   */
  private async handleParsed(data: [MessageDTO, IParsingContext]): Promise<void> {
    const [message, context] = data;
    const handler = this.getHandlerByName(context.handler);
    if (isNil(handler)) {
      this.logger.error(`Could not find handler with the given name: ${context.handler}`);
      return;
    }

    try {
      const handlingResult = await handler.handle(message, context);
      this.outgoing.next(handlingResult);
    } catch (error) {
      this.logger.info(`Handler could not handle message: ${error}`);
    }
  }

  /**
   * Takes a handled message and attempts to send a response from it.
   * @param data tuple of messageDTO and handling context
   */
  private async handleOutgoing(data: [MessageDTO, IHandlingContext]): Promise<void> {
    const [message, context] = data;
    try {
      await this.clientController.submitMessage(message, context);
    } catch (error) {
      this.logger.error(`Message could not be submitted: ${error}`);
    }
  }

  /**
   * Returns a parser service that has a given name.
   * @param name parser name
   */
  private getParserByName(name: string): IParser {
    for (const parser of this.parsers) {
      if (parser.getName() === name) {
        return parser;
      }
    }
  }

  /**
   * Returns a handler service that has a given name.
   * @param name handler name
   */
  private getHandlerByName(name: string): IHandler {
    for (const handler of this.handlers) {
      if (handler.getName() === name) {
        return handler;
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
