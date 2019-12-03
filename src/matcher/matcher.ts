import { Message as DiscordMessage } from 'discord.js';
import { IMatcherConfig } from 'src/config/models';
import { inject, injectable } from 'inversify';
import { SERVICE_IDENTIFIER } from 'src/constants/identifiers';

export interface IMatcher {
  match(message: DiscordMessage): void;
}

@injectable()
export class Matcher implements IMatcher {
  @inject(SERVICE_IDENTIFIER.IMatcherConfig)
  private config: IMatcherConfig;

  public match(message: DiscordMessage) {
    return;
  }
}
