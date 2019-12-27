import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MockParser } from './mockParser';
import { mockConfig } from './mockConfig';
import { ParsedRepository } from 'src/repository/parsed';

describe('Base Parser', () => {
  const repository = sinon.createStubInstance(ParsedRepository);
  const baseParser = new MockParser(mockConfig, repository);

  it('getName() method should return parser name', () => {
    const name = baseParser.getName();
    expect(name).to.be.equal('MockParser');
  });
});
