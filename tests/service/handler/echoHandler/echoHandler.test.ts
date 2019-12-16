import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { mockConfig } from './mockConfig';
import { EchoHandler } from 'src/service/handler';

describe('Echo Handler', () => {
  const handler = new EchoHandler(mockConfig);

  it('Should return messageDTO without changes', async () => {
    const message = { ...baseMessage, ...{ body: 'This should be handled' } };
    const [messageDTO] = await handler.handle(message, { handler: 'EchoHandler', parsedMessage: ['This should be handled'] });
    expect(messageDTO).to.deep.equal(message);
  });

  it('Should handle message without changing it', async () => {
    const message = { ...baseMessage, ...{ body: 'This should be handled' } };
    const [, context] = await handler.handle(message, { handler: 'EchoHandler', parsedMessage: ['This should be handled'] });
    expect(context).to.deep.equal({ color: mockConfig.color, title: 'Echo result', description: 'This should be handled' });
  });
});
