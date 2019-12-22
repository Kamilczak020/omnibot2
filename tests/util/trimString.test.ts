import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { trimString } from 'src/util';

describe('TrimString utility', () => {
  const value = 'This is a string to be trimmed';
  it('Should not trim a string if shorter than the trim length', () => {
    expect(trimString(value, 100)).to.be.equal(value);
  });

  it('Should trim a string if longer than the trim length', () => {
    expect(trimString(value, 12)).to.be.equal('This is a st…');
  });
});
