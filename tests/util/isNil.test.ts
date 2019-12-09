import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { isNil } from 'src/util';

describe('isNil utility', () => {
  it('Should return true when passed undefined', () => {
    expect(isNil(undefined)).to.be.true;
  });

  it('Should return true when passed null', () => {
    expect(isNil(null)).to.be.true;
  });

  it('Should return false when passed a non-nil object', () => {
    expect(isNil(true)).to.be.false;
    expect(isNil(1)).to.be.false;
    expect(isNil('')).to.be.false;
    expect(isNil(Symbol())).to.be.false;
    expect(isNil([])).to.be.false;
    expect(isNil(new Set())).to.be.false;
    expect(isNil({})).to.be.false;
    expect(isNil(() => null)).to.be.false;
    expect(isNil(new Error())).to.be.false;
    expect(isNil(/foo/)).to.be.false;
  });
});
