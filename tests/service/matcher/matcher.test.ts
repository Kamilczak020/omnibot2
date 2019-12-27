import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { regexpAnyConfig, regexpFirstWordConfig, stringAnyConfig, stringFirstWordConfig, config } from './mockConfig';
import { Matcher } from 'src/service/matcher';
import { baseMessage } from 'tests/service/mockMessage';
import { MatchingError } from 'src/error';
import { MatchedRepository } from 'src/repository/matched';

describe('Matcher', () => {
  describe('Regexp test with \'any\' strategy', () => {
    const repository = sinon.createStubInstance(MatchedRepository);
    const matcher = new Matcher(regexpAnyConfig, repository);

    it('Should match when body is a single-word string', async () => {
      const message = { ...baseMessage, ...{ body: 'foo' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'anyRegexpHandler', parser: 'anyRegexpParser', message });
    });

    it('Should match when body is a multi-word string', async () => {
      const message = { ...baseMessage, ...{ body: 'is foo amazing' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'anyRegexpHandler', parser: 'anyRegexpParser', message });
    });

    it('Should throw a MatchingError when there is no match', async () => {
      const message = { ...baseMessage, ...{ body: 'this should throw' } };
      try {
        await matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('Regexp test with \'first-word\' strategy', () => {
    const repository = sinon.createStubInstance(MatchedRepository);
    const matcher = new Matcher(regexpFirstWordConfig, repository);

    it('Should match on first word', async () => {
      const message = { ...baseMessage, ...{ body: 'bar is a first word' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'firstWordRegexpHandler', parser: 'firstWordRegexpParser', message });
    });

    it('Should throw a MatchingError when there is no match on first word', async () => {
      const message = { ...baseMessage, ...{ body: 'nor first bar anymore' } };
      try {
        await matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'any\' strategy', () => {
    const repository = sinon.createStubInstance(MatchedRepository);
    const matcher = new Matcher(stringAnyConfig, repository);

    it('Should match when body is a single-word string', async () => {
      const message = { ...baseMessage, ...{ body: 'boo' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'anyStringHandler', parser: 'anyStringParser', message });
    });

    it('Should match when body is a multi-word string', async () => {
      const message = { ...baseMessage, ...{ body: 'is boo amazing' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'anyStringHandler', parser: 'anyStringParser', message });
    });

    it('Should throw a MatchingError when there is no match', async () => {
      const message = { ...baseMessage, ...{ body: 'this should throw' } };
      try {
        await matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'first-word\' strategy', () => {
    const repository = sinon.createStubInstance(MatchedRepository);
    const matcher = new Matcher(stringFirstWordConfig, repository);

    it('Should match on first word', async () => {
      const message = { ...baseMessage, ...{ body: 'far is a first word' } };
      const result = await matcher.match(message);
      expect(result).to.deep.equal({ id: undefined, handler: 'firstWordStringHandler', parser: 'firstWordStringParser', message });
    });

    it('Should throw a MatchingError when there is no match on first word', async () => {
      const message = { ...baseMessage, ...{ body: 'not first far anymore' } };
      try {
        await matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  it('Should throw a MatchingError when message is empty', async () => {
    const repository = sinon.createStubInstance(MatchedRepository);
    const matcher = new Matcher(config, repository);
    const message = baseMessage;

    try {
      await matcher.match(message);
    } catch (error) {
      expect(error).to.be.instanceOf(MatchingError);
    }
  });
});
