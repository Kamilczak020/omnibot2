import * as fs from 'fs';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { loadConfig } from 'src/config/loader';
import { mockConfig, invalidMockConfig } from './mockConfig';
import { IMockConfig, TMockConfig } from './mockConfigSchema';
import { NotFoundError, ConfigurationError } from 'src/error';

describe('Config loader', () => {
  describe('Valid Config handling', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
      sandbox.stub(fs, 'readFileSync')
        .withArgs('foo.yaml', 'utf8')
        .returns(mockConfig);

      sandbox.stub(fs, 'existsSync')
      .withArgs('foo.yaml')
      .returns(true);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should load correct config', () => {
      const config = loadConfig<IMockConfig>(TMockConfig, 'foo.yaml');

      expect(config.name).to.equal('mockConfig');
      expect(config.rules.length).to.equal(1);
      expect(config.rules[0].handler).to.equal('mockHandler');
      expect(config.rules[0].parser).to.equal('mockParser');

      const compareRegexp = /foo/gi;
      if (config.rules[0].test instanceof RegExp) {
        expect(config.rules[0].test.source).to.equal(compareRegexp.source);
        expect(config.rules[0].test.flags).to.equal(compareRegexp.flags);
      }
    });
  });

  describe('Invalid Config handling', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
      sandbox.stub(fs, 'readFileSync')
        .withArgs('foo.yaml', 'utf8')
        .returns(invalidMockConfig);

      sandbox.stub(fs, 'existsSync')
        .withArgs('foo.yaml')
        .returns(true);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should throw a NotFoundError on missing configuration file', () => {
      try {
        loadConfig<IMockConfig>(TMockConfig, 'bar.yaml');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('Should throw a ConfigurationError on schema-config mismatch', () => {
      try {
        loadConfig<IMockConfig>(TMockConfig, 'foo.yaml');
      } catch (error) {
        expect(error).to.be.instanceOf(ConfigurationError);
      }
    });
  });
});
