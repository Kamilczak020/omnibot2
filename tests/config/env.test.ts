import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { envType } from 'src/config/env';
import { NotFoundError } from 'src/error';

describe('Custom config !env type', () => {
  beforeEach(() => {
    process.env.TOKEN = 'test';
  });

  afterEach(() => {
    delete process.env.TOKEN;
  });

  it('Should throw NotFoundError on missing variables', () => {
    try {
      envType.resolve('DOES_NOT_EXIST');
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
    }
  });

  it('Should resolve existing variables', () => {
    expect(envType.resolve('TOKEN')).to.equal(true);
  });

  it('Should construct a value from env variable', () => {
    expect(envType.construct('TOKEN')).to.equal('test');
  });
});
