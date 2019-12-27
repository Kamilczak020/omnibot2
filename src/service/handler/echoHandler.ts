import { injectable, inject } from 'inversify';
import { MessageDTO, ParsedDTO } from 'src/entity';
import { IParsingContext } from 'src/service/parser';
import { IEchoHandlerConfig } from 'src/config/service/handler';
import { IHandler, BaseHandler } from './baseHandler';
import { IHandlingContext } from './handlingContext';
import { CONFIG_IDENTIFIER } from 'src/constants';

export type IEchoHandler = IHandler;

@injectable()
export class EchoHandler extends BaseHandler implements IEchoHandler {
  protected config: IEchoHandlerConfig;

  public constructor(@inject(CONFIG_IDENTIFIER.IEchoHandlerConfig) config: IEchoHandlerConfig) {
    super(config);
  }

  public async handle(parsed: ParsedDTO): Promise<[MessageDTO, IHandlingContext]> {
    const handlingContext = {
      color: this.config.color,
      title: 'Echo result',
      description: parsed.parsedMessage.join(' '),
    };

    return [parsed.message, handlingContext];
  }
}
