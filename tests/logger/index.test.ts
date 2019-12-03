import { Logger } from '../../src/logger';
import { WriteStream } from 'fs';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import Sinon = require('sinon');

chai.use(sinonChai);
const expect = chai.expect;

describe('Logger', () => {
  describe('Base properties & constructor', () => {
    it('Should have default options, with format and transport properties', () => {
      const logger = new Logger();
      expect(logger['loggerOptions'] == null).to.be.false;
      expect(logger['loggerOptions'].format == null).to.be.false;
      expect(logger['loggerOptions'].transport == null).to.be.false;
    });

    it('Should have default options, with format and transport properties', () => {
      const logger = new Logger({ format: '[{level}] {message}', transport: process.stderr });
      expect(logger['loggerOptions'] == null).to.be.false;
      expect(logger['loggerOptions'].format === '[{level}] {message}').to.be.true;
      expect(logger['loggerOptions'].transport === process.stderr).to.be.true;
    });
  });

  describe('setDefaultOptions()', () => {
    const logger = new Logger();
    logger.setDefaultOptions({ format: '[{level}] {message}', transport: process.stderr });

    it('Should set default options to the ones passed through method', () => {
      expect(logger['loggerOptions'] == null).to.be.false;
      expect(logger['loggerOptions'].format === '[{level}] {message}').to.be.true;
      expect(logger['loggerOptions'].transport === process.stderr).to.be.true;
    });
  });

  describe('logging methods', () => {
    const logger = new Logger();
    let mockStream: Sinon.SinonStubbedInstance<WriteStream>;

    beforeEach(() => {
      mockStream = sinon.createStubInstance(WriteStream);
      logger['loggerOptions'].transport = mockStream as any;
    });

    it('info() should call the transport stream with a log message of level INFO', () => {
      logger.info('This is a test message', '[{level}] {message}');
      expect(mockStream.write.calledOnce).to.be.true;
      expect(mockStream.write.calledWith('[INFO] This is a test message')).to.be.true;
    });

    it('debug() should call the transport stream with a log message of level DEBUG', () => {
      logger.debug('This is a test message', '[{level}] {message}');
      expect(mockStream.write.calledOnce).to.be.true;
      expect(mockStream.write.calledWith('[DEBUG] This is a test message')).to.be.true;
    });

    it('warn() should call the transport stream with a log message of level WARNING', () => {
      logger.warn('This is a test message', '[{level}] {message}');
      expect(mockStream.write.calledOnce).to.be.true;
      expect(mockStream.write.calledWith('[WARNING] This is a test message')).to.be.true;
    });

    it('error() should call the transport stream with a log message of level ERROR', () => {
      logger.error('This is a test message', '[{level}] {message}');
      expect(mockStream.write.calledOnce).to.be.true;
      expect(mockStream.write.calledWith('[ERROR] This is a test message')).to.be.true;
    });
  });
});
