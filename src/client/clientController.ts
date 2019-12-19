import { Client as DiscordClient, PresenceData, TextChannel, RichEmbed, DMChannel } from 'discord.js';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from 'src/constants';
import { DiscordClientError } from 'src/error';
import { ILogger } from 'src/logger';
import { MessageDTO } from 'src/entity';
import { IHandlingContext } from 'src/service/handler/handlingContext';

export interface IClientController {
  login(token: string): Promise<void>;
  setPresence(data: PresenceData): Promise<void>;
  attachHandler(event: string, handler: Function): void;
  removeAllListeners(events: Array<string>): void;
  submitMessage(message: MessageDTO, context: IHandlingContext): Promise<void>;
  destroy(): Promise<void>;
}

@injectable()
export class ClientController implements IClientController {
  private client: DiscordClient;
  private logger: ILogger;

  public constructor(
    @inject(SERVICE_IDENTIFIER.DiscordClient) client: DiscordClient,
    @inject(SERVICE_IDENTIFIER.ILogger) logger: ILogger,
  ) {
    this.client = client;
    this.logger = logger;
  }

  /**
   * Attempts to log into the discord api as a bot service.
   * @param token discord bot token
   */
  public async login(token: string): Promise<void> {
    try {
      this.logger.info('Logging into discord API.');
      await this.client.login(token);
    } catch (error) {
      this.logger.error('Failed to login to the discord API.');
      throw new DiscordClientError('Could not login to the discord API.');
    }
  }

  /**
   * Attempts to send a message to a discord channel (TextChannel or DMChannel).
   * If a channel is not of either of those types, throws.
   * @param message message DTO
   * @param context handling context
   */
  public async submitMessage(message: MessageDTO, context: IHandlingContext): Promise<void> {
    const guild = this.client.guilds.find((guildQuery) => guildQuery.id === message.guild);
    const channel = guild.channels.find((channelQuery) => channelQuery.id === message.channel);
    const embed = this.createEmbedFromContext(context);

    if (channel instanceof TextChannel) {
      try {
        this.logger.info('Sending response to guild channel.');
        await channel.send(embed);
      } catch (error) {
        this.logger.error('Failed to send message to guild channel');
        throw new DiscordClientError('Could not send message.');
      }
    } else if (channel instanceof DMChannel) {
      try {
        this.logger.info('Sending response to DM channel.');
        await channel.send(embed);
      } catch (error) {
        this.logger.error('Failed to send message to DM channel');
        throw new DiscordClientError('Could not send message.');
      }
    }

    throw new DiscordClientError('Channel type not supported.');
  }

  /**
   * Attempts to set bot user presence.
   * @param data presence data
   */
  public async setPresence(data: PresenceData): Promise<void> {
    try {
      this.logger.info('Setting bot presence.');
      await this.client.user.setPresence(data);
    } catch (error) {
      this.logger.error('Failed to set bot presence.');
      throw new DiscordClientError('Could not set presence.');
    }
  }

  /**
   * Attaches a handler to a bot event.
   * @param event bot event
   * @param handler event handler
   */
  public attachHandler(event: string, handler: Function): void {
    this.logger.info(`Attaching event handler for ${event}`);
    this.client.on(event, handler);
  }

  /**
   * Removes all listeners given event names.
   * @param events event names
   */
  public removeAllListeners(events: Array<string>): void {
    for (const event of events) {
      this.logger.info(`Removing event handler for ${event}`);
      this.client.removeAllListeners(event);
    }
  }

  /**
   * Attempts to destroy the bot service.
   */
  public async destroy() {
    try {
      this.logger.info('Destroying client service.');
      await this.client.destroy();
    } catch (error) {
      this.logger.error('Failed to destroy bot client service.');
      throw new DiscordClientError('Could not destroy bot client.');
    }
  }

  private createEmbedFromContext(context: IHandlingContext): RichEmbed {
    const embed = new RichEmbed();
    embed.title = context.title;
    embed.description = context.description;
    embed.fields = context.fields?.map((field) => ({
      name: field.name,
      value: field.value,
      inline: field.inline,
    }));

    return embed;
  }
}
