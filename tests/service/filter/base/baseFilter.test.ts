import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MockFilter } from './mockFilter';
import { mockConfig } from './mockConfig';
import { FilteredRepository } from 'src/repository/filtered';

describe('Base Filter', () => {
  const repository = sinon.createStubInstance(FilteredRepository);
  const baseFilter = new MockFilter(mockConfig, repository);

  it('getName() method should return filter name', () => {
    const name = baseFilter.getName();
    expect(name).to.be.equal('MockFilter');
  });
});
