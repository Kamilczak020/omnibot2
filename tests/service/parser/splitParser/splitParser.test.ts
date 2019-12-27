import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { SplitParser } from 'src/service/parser';
import { splitWithoutSkipConfig, splitWithSkipConfig } from './mockConfig';
import { ParsingError } from 'src/error';
import { ParsedRepository } from 'src/repository/parsed';

describe('Split Parser', () => {
  it('Should return messageDTO without changing it and persist to database', async () => {
    const repository = sinon.createStubInstance(ParsedRepository);
    const parser = new SplitParser(splitWithoutSkipConfig, repository);
    const message = { ...baseMessage, ...{ body: 'foo' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    const result = await parser.parse(matchedDTO);
    expect(result).to.deep.equal({ id: undefined, handler: matchedDTO.handler, parsedMessage: [message.body], message });
    expect(repository.insert.calledOnce).to.be.true;
  });

  it('Should be able to split a single word message and persist to database', async () => {
    const repository = sinon.createStubInstance(ParsedRepository);
    const parser = new SplitParser(splitWithoutSkipConfig, repository);
    const message = { ...baseMessage, ...{ body: 'foo' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    const result = await parser.parse(matchedDTO);
    expect(result.parsedMessage).to.deep.equal(['foo']);
    expect(repository.insert.calledOnce).to.be.true;
  });

  it('Should be able to split a multi word message and persist to database', async () => {
    const repository = sinon.createStubInstance(ParsedRepository);
    const parser = new SplitParser(splitWithoutSkipConfig, repository);
    const message = { ...baseMessage, ...{ body: 'this should be split' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    const result = await parser.parse(matchedDTO);
    expect(result.parsedMessage).to.deep.equal(['this', 'should', 'be', 'split']);
    expect(repository.insert.calledOnce).to.be.true;
  });

  it('Should skip according to config and persist to database', async () => {
    const repository = sinon.createStubInstance(ParsedRepository);
    const parser = new SplitParser(splitWithSkipConfig, repository);
    const message = { ...baseMessage, ...{ body: 'skip skip skip this should go in' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    const result = await parser.parse(matchedDTO);
    expect(result.parsedMessage).to.deep.equal(['this', 'should', 'go', 'in']);
    expect(repository.insert.calledOnce).to.be.true;
  });

  it('Should throw when about to return an empty array', async () => {
    const repository = sinon.createStubInstance(ParsedRepository);
    const parser = new SplitParser(splitWithSkipConfig, repository);
    const message = { ...baseMessage, ...{ body: 'not enough' } };
    const matchedDTO = { id: undefined, parser: 'EchoParser', handler: 'MockHandler', message };
    try {
      await parser.parse(matchedDTO);
    } catch (error) {
      expect(error).to.be.instanceOf(ParsingError);
    }
  });
});
