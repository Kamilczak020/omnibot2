import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { regexpAnyConfig, regexpFirstWordConfig, stringAnyConfig, stringFirstWordConfig, config } from './mockConfig';
import { Matcher } from 'src/service/matcher';
import { MessageDTO } from 'src/entity';
import { MatchingError } from 'src/error';

describe('Matcher', () => {
  const matcher = new Matcher();
  const message: MessageDTO = {
    id: '1',
    messageId: '1',
    body: 'foo',
    channel: 'test',
    guild: 'test',
    author: 'test',
    timestamp: new Date(),
  };

  describe('Regexp test with \'any\' strategy', () => {
    matcher['config'] = regexpAnyConfig;

    it('Should match when body is a single-word string', () => {
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'anyRegexpHandler', parser: 'anyRegexpParser' }]);
    });

    it('Should match when body is a multi-word string', () => {
      message.body = 'is foo amazing';
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'anyRegexpHandler', parser: 'anyRegexpParser' }]);
    });

    it('Should throw a MatchingError when there is no match', () => {
      message.body = 'this should throw';
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('Regexp test with \'first-word\' strategy', () => {
    matcher['config'] = regexpFirstWordConfig;
    it('Should match on first word', () => {
      message.body = 'bar is a first word';
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'firstWordRegexpHandler', parser: 'firstWordRegexpParser' }]);
    });

    it('Should throw a MatchingError when there is no match on first word', () => {
      message.body = 'not first bar anymore';
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'any\' strategy', () => {
    matcher['config'] = stringAnyConfig;
    it('Should match when body is a single-word string', () => {
      message.body = 'boo';
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'anyStringHandler', parser: 'anyStringParser' }]);
    });

    it('Should match when body is a multi-word string', () => {
      message.body = 'is boo amazing';
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'anyStringHandler', parser: 'anyStringParser' }]);
    });

    it('Should throw a MatchingError when there is no match', () => {
      message.body = 'this should throw';
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  describe('String test with \'first-word\' strategy', () => {
    matcher['config'] = stringFirstWordConfig;
    it('Should match on first word', () => {
      message.body = 'far is a first word';
      const result = matcher.match(message);
      expect(result).to.be.equal([message, { handler: 'firstWordStringHandler', parser: 'firstWordStringParser' }]);
    });

    it('Should throw a MatchingError when there is no match on first word', () => {
      message.body = 'not first far anymore';
      try {
        matcher.match(message);
      } catch (error) {
        expect(error).to.be.instanceOf(MatchingError);
      }
    });
  });

  it('Should throw a MatchingError when message is empty', () => {
    matcher['config'] = config;
    message.body = '';
    try {
      matcher.match(message);
    } catch (error) {
      expect(error).to.be.instanceOf(MatchingError);
    }
  });
});
