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
  @inject(CONFIG_IDENTIFIER.IMatcherConfig)
  private config: IMatcherConfig;

  public match(message: MessageDTO): [MessageDTO, IMatchingContext] {
    if (isEmpty(message.body)) {
      throw new MatchingError('Cannot match an empty message body.');
    }

    this.config.rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (this.matchRegexpWithStrategy(message.body, rule.test, rule.strategy)) {
          return [message, rule.context];
        }
      } else {
        if (this.matchStringWithStrategy(message.body, rule.test, rule.strategy)) {
          return [message, rule.context];
        }
      }
    });

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
        return body === test;
      }
      case 'first-word': {
        return body.split(' ')[0] === test;
      }
    }
  }
}
