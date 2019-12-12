import { inject, injectable } from 'inversify';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { MessageDTO } from 'src/entity';
import { MatchingError } from 'src/error';
import { isEmpty } from 'lodash';
import { IService, BaseService } from 'src/service/base';
import { IMatcherConfig, IMatchingContext } from 'src/config/matcher';

export interface IMatcher extends IService {
  match(message: MessageDTO): [MessageDTO, IMatchingContext];
}

@injectable()
export class Matcher extends BaseService implements IMatcher {
  protected config: IMatcherConfig;

  public constructor(
    @inject(CONFIG_IDENTIFIER.IMatcherConfig) config: IMatcherConfig,
  ) {
    super(config);
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
