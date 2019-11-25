import { Message as DiscordMessage, Client as DiscordClient } from 'discord.js';
import { SERVICE_IDENTIFIER } from 'src/constants/identifiers';
import { inject, injectable } from 'inversify';
import { ILogger } from 'src/logger';
import { Subject } from 'rxjs';

export interface IBot {
  start(): void;
  stop(): void;
}

@injectable()
export class Bot implements IBot {
  @inject(SERVICE_IDENTIFIER.ILogger)
  private logger: ILogger;

  @inject(SERVICE_IDENTIFIER.DiscordClient)
  private client: DiscordClient;

  @inject(SERVICE_IDENTIFIER.DiscordToken)
  private readonly token: string;

  private incoming: Subject<DiscordMessage>;

  /**
   * Starts the bot service, attaches event listeners and attempts
   * to log in to the discord client.
   */
  public async start() {
    this.initialize();
    this.logger.info('Starting bot service.');

    const streamError = (err: Error) => {
      this.logger.error(`${err} Bot did not handle error.`);
    };

    this.incoming.subscribe((next) => this.handleIncoming(next).catch(streamError));

    this.client.on('ready', () => this.logger.info('Discord listener is ready.'));
    this.client.on('message', (message) => this.incoming.next(message));

    await this.client.login(this.token);
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
   * Initializes queues, data stores and service collections.
   */
  private initialize() {
    this.logger.info('Creating bot service.');
    this.incoming = new Subject();
  }

  /**
   * Handles an incoming message by running it through various registered services.
   * @param message message to handle
   */
  private async handleIncoming(message: DiscordMessage) {
    return;
  }
}
