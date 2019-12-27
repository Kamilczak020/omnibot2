import { MessageDTO, ParsedDTO } from 'src/entity';
import { IParsingContext } from 'src/service/parser';
import { IMockHandlerConfig } from './mockConfig';
import { IHandler, BaseHandler } from 'src/service/handler';
import { IHandlingContext } from 'src/service/handler/handlingContext';

export type IMockHandler = IHandler;

export class MockHandler extends BaseHandler implements IMockHandler {
  protected readonly config: IMockHandlerConfig;

  public constructor(config: IMockHandlerConfig) {
    super(config);
  }

  public async handle(parsed: ParsedDTO): Promise<[MessageDTO, IHandlingContext]> {
    const handlingContext = {
      color: this.config.color,
      title: 'Mock result',
      description: parsed.parsedMessage.join(),
    };

    return [parsed.message, handlingContext];
  }
}
