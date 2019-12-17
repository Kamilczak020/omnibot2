import { injectable, inject } from 'inversify';
import { MessageDTO } from 'src/entity';
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

  public async handle(message: MessageDTO, context: IParsingContext): Promise<[MessageDTO, IHandlingContext]> {
    const handlingContext = {
      color: this.config.color,
      title: 'Echo result',
      description: context.parsedMessage.join(),
    };

    return [message, handlingContext];
  }
}
