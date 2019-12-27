import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { EchoParser } from 'src/service/parser';
import { mockConfig } from './mockConfig';
import { ParsedRepository } from 'src/repository/parsed';

describe('Echo Parser', () => {
  const repository = sinon.createStubInstance(ParsedRepository);
  const parser = new EchoParser(mockConfig, repository);

  it('Should parse message without making any changes to it and persist to database', async () => {
    const message = { ...baseMessage, ...{ body: 'This should be parsed without changes' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    const result = await parser.parse(matchedDTO);
    expect(result).to.deep.equal({ id: undefined, handler: matchedDTO.handler, parsedMessage: [message.body], message });
    expect(repository.insert.calledOnce).to.be.true;
  });
});
