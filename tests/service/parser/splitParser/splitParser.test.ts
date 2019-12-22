import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { SplitParser } from 'src/service/parser';
import { splitWithoutSkipConfig, splitWithSkipConfig } from './mockConfig';
import { ParsingError } from 'src/error';

describe('Split Parser', () => {
  it('Should return messageDTO without changing it', () => {
    const parser = new SplitParser(splitWithoutSkipConfig);
    const message = { ...baseMessage, ...{ body: 'foo' } };
    const [messageDTO] = parser.parse(message, { parser: 'MockParser', handler: 'MockHandler' });
    expect(messageDTO).to.deep.equal(message);
  });

  it('Should be able to split a single word message', () => {
    const parser = new SplitParser(splitWithoutSkipConfig);
    const message = { ...baseMessage, ...{ body: 'foo' } };
    const [, context] = parser.parse(message, { parser: 'MockParser', handler: 'MockHandler' });
    expect(context.parsedMessage).to.deep.equal(['foo']);
  });

  it('Should be able to split a multi word message', () => {
    const parser = new SplitParser(splitWithoutSkipConfig);
    const message = { ...baseMessage, ...{ body: 'this should be split' } };
    const [, context] = parser.parse(message, { parser: 'MockParser', handler: 'MockHandler' });
    expect(context.parsedMessage).to.deep.equal(['this', 'should', 'be', 'split']);
  });

  it('Should skip according to config', () => {
    const parser = new SplitParser(splitWithSkipConfig);
    const message = { ...baseMessage, ...{ body: 'skip skip skip this should go in' } };
    const [, context] = parser.parse(message, { parser: 'MockParser', handler: 'MockHandler' });
    expect(context.parsedMessage).to.deep.equal(['this', 'should', 'go', 'in']);
  });

  it('Should throw when about to return an empty array', () => {
    const parser = new SplitParser(splitWithSkipConfig);
    const message = { ...baseMessage, ...{ body: 'not enough' } };
    try {
      parser.parse(message, { parser: 'MockParser', handler: 'MockHandler' });
    } catch (error) {
      expect(error).to.be.instanceOf(ParsingError);
    }
  });
});
