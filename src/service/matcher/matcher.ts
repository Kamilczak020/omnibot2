import { inject, injectable } from 'inversify';
import { CONFIG_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { MessageDTO, MatchedDTO } from 'src/entity';
import { MatchingError } from 'src/error';
import { isEmpty } from 'lodash';
import { IService, BaseService } from 'src/service/base';
import { IMatcherConfig } from 'src/config/service/matcher';
import { IMatchedRepository } from 'src/repository/matched';

export interface IMatcher extends IService {
  match(message: MessageDTO): Promise<MatchedDTO>;
}

@injectable()
export class Matcher extends BaseService implements IMatcher {
  protected config: IMatcherConfig;
  private readonly matchedRepository: IMatchedRepository;

  public constructor(
    @inject(CONFIG_IDENTIFIER.IMatcherConfig) config: IMatcherConfig,
    @inject(REPOSITORY_IDENTIFIER.IMatchedRepository) repository: IMatchedRepository,
  ) {
    super(config);
    this.matchedRepository = repository;
  }

  public async match(message: MessageDTO): Promise<MatchedDTO> {
    if (isEmpty(message.body)) {
      throw new MatchingError('Cannot match an empty message body.');
    }

    for (const rule of this.config.rules) {
      for (const test of rule.tests) {
        if (test instanceof RegExp) {
          if (this.matchRegexpWithStrategy(message.body, test, rule.strategy)) {
            const matchedDTO = { id: undefined, parser: rule.context.parser, handler: rule.context.handler, message };

            await this.matchedRepository.insert([matchedDTO]);
            return matchedDTO;
          }
        } else {
          if (this.matchStringWithStrategy(message.body, test, rule.strategy)) {
            const matchedDTO = { id: undefined, parser: rule.context.parser, handler: rule.context.handler, message };

            await this.matchedRepository.insert([matchedDTO]);
            return matchedDTO;
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
