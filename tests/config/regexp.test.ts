import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { regexpType } from 'src/config/regexp';
import { InvalidArgumentError } from 'src/error';

describe('Custom config !regexp type', () => {
  beforeEach(() => {
    process.env.TOKEN = 'test';
  });

  afterEach(() => {
    delete process.env.TOKEN;
  });

  it('Should match slashed strings', () => {
    expect(regexpType.resolve('/foo/')).to.equal(true);
  });

  it('Should match flags', () => {
    const regexp: RegExp = regexpType.construct('/foo/g');
    expect(regexp.flags).to.equal('g');
  });

  it('Should not match bare strings', () => {
    expect(regexpType.resolve('foo')).to.equal(false);
  });

  it('Should throw InvalidArgumentError on invalid regexp', () => {
    try {
      regexpType.construct('/*/');
    } catch (error) {
      expect(error).to.be.instanceOf(InvalidArgumentError);
    }
  });
});
