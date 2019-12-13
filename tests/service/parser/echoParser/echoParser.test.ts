import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { EchoParser } from 'src/service/parser';
import { mockConfig } from './mockConfig';

describe('Echo Parser', () => {
  const parser = new EchoParser(mockConfig);

  it('Should parse message without making any changes to it', () => {
    const message = { ...baseMessage, ...{ body: 'This should be parsed without changes' } };
    const result = parser.parse(message, { parser: 'EchoParser', handler: 'MockHandler' });
    expect(result).to.deep.equal([message, { handler: 'MockHandler', parsedMessage: [message.body] }]);
  });
});
