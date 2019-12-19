import { WriteStream } from 'fs';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { Logger } from 'src/logger';

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
    let mockStream: sinon.SinonStubbedInstance<WriteStream>;

    beforeEach(() => {
      mockStream = sinon.createStubInstance(WriteStream);
      logger['loggerOptions'].transport = mockStream as any;
    });

    describe('info()', () => {
      it('Should call the transport stream with a log message of level INFO', () => {
        logger.info('This is a test message', '[{level}] {message}');
        expect(mockStream.write.calledOnce).to.be.true;
        expect(mockStream.write.calledWith('[INF] This is a test message\n')).to.be.true;
      });

      it('Should use default format when none is passed', () => {
        logger.info('This is a test message');
        expect(mockStream.write.calledOnce).to.be.true;
      });
    });

    describe('debug()', () => {
      it('Should call the transport stream with a log message of level DEBUG', () => {
        logger.debug('This is a test message', '[{level}] {message}');
        expect(mockStream.write.calledOnce).to.be.true;
        expect(mockStream.write.calledWith('[DBG] This is a test message\n')).to.be.true;
      });

      it('Should use default format when none is passed', () => {
        logger.debug('This is a test message');
        expect(mockStream.write.calledOnce).to.be.true;
      });
    });

    describe('warn()', () => {
      it('Should call the transport stream with a log message of level WARNING', () => {
        logger.warn('This is a test message', '[{level}] {message}');
        expect(mockStream.write.calledOnce).to.be.true;
        expect(mockStream.write.calledWith('[WRN] This is a test message\n')).to.be.true;
      });

      it('Should use default format when none is passed', () => {
        logger.warn('This is a test message');
        expect(mockStream.write.calledOnce).to.be.true;
      });
    });

    describe('error()', () => {
      it('Should call the transport stream with a log message of level ERROR', () => {
        logger.error('This is a test message', '[{level}] {message}');
        expect(mockStream.write.calledOnce).to.be.true;
        expect(mockStream.write.calledWith('[ERR] This is a test message\n')).to.be.true;
      });

      it('Should use default format when none is passed', () => {
        logger.error('This is a test message');
        expect(mockStream.write.calledOnce).to.be.true;
      });
    });
  });
});
