import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MockFilter } from './mockFilter';
import { mockConfig } from './mockConfig';

describe('Base Filter', () => {
  const baseFilter = new MockFilter(mockConfig);

  it('getName() method should return filter name', () => {
    const name = baseFilter.getName();
    expect(name).to.be.equal('MockFilter');
  });
});
