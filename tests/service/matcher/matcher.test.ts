import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { regexpAnyConfig, regexpFirstWordConfig, stringAnyConfig, stringFirstWordConfig, config } from './mockConfig';
import { Matcher } from 'src/service/matcher';
import { baseMessage } from './mockMessage';
import { MatchingError } from 'src/error';

describe('Matcher', () => {
  describe('Regexp test with \'any\' strategy', () => {
    const matcher = new Matcher(regexpAnyConfig);

    it('Should match when body is a single-word string', () => {
      const message = { ...baseMessage, ...{ body: 'foo' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'anyRegexpHandler', parser: 'anyRegexpParser' }]);
    });

    it('Should match when body is a multi-word string', () => {
      const message = { ...baseMessage, ...{ body: 'is foo amazing' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'anyRegexpHandler', parser: 'anyRegexpParser' }]);
    });

    it('Should throw a MatchingError when there is no match', () => {
      const message = { ...baseMessage, ...{ body: 'this should throw' } };
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('Regexp test with \'first-word\' strategy', () => {
    const matcher = new Matcher(regexpFirstWordConfig);

    it('Should match on first word', () => {
      const message = { ...baseMessage, ...{ body: 'bar is a first word' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'firstWordRegexpHandler', parser: 'firstWordRegexpParser' }]);
    });

    it('Should throw a MatchingError when there is no match on first word', () => {
      const message = { ...baseMessage, ...{ body: 'nor first bar anymore' } };
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'any\' strategy', () => {
    const matcher = new Matcher(stringAnyConfig);

    it('Should match when body is a single-word string', () => {
      const message = { ...baseMessage, ...{ body: 'boo' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'anyStringHandler', parser: 'anyStringParser' }]);
    });

    it('Should match when body is a multi-word string', () => {
      const message = { ...baseMessage, ...{ body: 'is boo amazing' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'anyStringHandler', parser: 'anyStringParser' }]);
    });

    it('Should throw a MatchingError when there is no match', () => {
      const message = { ...baseMessage, ...{ body: 'this should throw' } };
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'first-word\' strategy', () => {
    const matcher = new Matcher(stringFirstWordConfig);

    it('Should match on first word', () => {
      const message = { ...baseMessage, ...{ body: 'far is a first word' } };
      const result = matcher.match(message);
      expect(result).to.deep.equal([message, { handler: 'firstWordStringHandler', parser: 'firstWordStringParser' }]);
    });

    it('Should throw a MatchingError when there is no match on first word', () => {
      const message = { ...baseMessage, ...{ body: 'not first far anymore' } };
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  it('Should throw a MatchingError when message is empty', () => {
    const matcher = new Matcher(config);
    const message = baseMessage;

    try {
      matcher.match(message);
    } catch (error) {
      expect(error).to.be.instanceOf(MatchingError);
    }
  });
});
