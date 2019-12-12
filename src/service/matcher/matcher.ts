import { IMatcherConfig, IMatchingContext } from 'src/config/models';
import { inject, injectable } from 'inversify';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { MessageDTO } from 'src/entity';
import { MatchingError } from 'src/error';
import { isEmpty } from 'lodash';

export interface IMatcher {
  match(message: MessageDTO): [MessageDTO, IMatchingContext];
}

@injectable()
export class Matcher implements IMatcher {
  private readonly config: IMatcherConfig;

  public constructor(
    @inject(CONFIG_IDENTIFIER.IMatcherConfig) config: IMatcherConfig,
  ) {
    this.config = config;
  }

  public match(message: MessageDTO): [MessageDTO, IMatchingContext] {
    if (isEmpty(message.body)) {
      throw new MatchingError('Cannot match an empty message body.');
    }

    for (const rule of this.config.rules) {
      for (const test of rule.tests) {
        if (test instanceof RegExp) {
          if (this.matchRegexpWithStrategy(message.body, test, rule.strategy)) {
            return [message, rule.context];
          }
        } else {
          if (this.matchStringWithStrategy(message.body, test, rule.strategy)) {
            return [message, rule.context];
          }
        }
      }
    }

    throw new MatchingError('Message did not match with anything.');
  }

  private matchRegexpWithStrategy(body: string, test: RegExp, strategy: 'first-word' | 'any'): boolean {
    switch (strategy) {
      case 'any': {
        const matchResult = body.match(test);
        return !isEmpty(matchResult);
      }
      case 'first-word': {
        const words = body.split(' ');
        const matchResult = words[0].match(test);
        return !isEmpty(matchResult);
      }
    }
  }

  private matchStringWithStrategy(body: string, test: string, strategy: 'first-word' | 'any'): boolean {
    switch (strategy) {
      case 'any': {
        return body.indexOf(test) > -1;
      }
      case 'first-word': {
        return body.split(' ')[0] === test;
      }
    }
  }
}
