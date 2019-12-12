import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MockParser } from './mockParser';
import { mockConfig } from './mockConfig';

describe('Base Parser', () => {
  const baseParser = new MockParser(mockConfig);

  it('getName() method should return parser name', () => {
    const name = baseParser.getName();
    expect(name).to.be.equal('MockParser');
  });
});
