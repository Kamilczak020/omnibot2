import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import 'mocha';
import 'reflect-metadata';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { UserFilter } from 'src/service/filter';
import { mockConfig } from './mockConfig';
import { FilteredRepository } from 'src/repository/filtered';

describe('Word Filter', () => {
  const repository = sinon.createStubInstance(FilteredRepository);
  const filter = new UserFilter(mockConfig, repository);

  it('Should return false when author was not filtered', async () => {
    const message = { ...baseMessage, ...{ author: '1234' } };
    const result = await filter.filter(message);
    expect(result).to.be.false;
  });

  it('Should return true when author was filtered and persist to database', async () => {
    const message = { ...baseMessage, ...{ author: '1234567890' } };
    const result = await filter.filter(message);
    expect(result).to.be.true;
    expect(repository.insert.calledOnce).to.be.true;
  });
});
