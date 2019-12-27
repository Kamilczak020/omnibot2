import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { baseMessage } from 'tests/service/mockMessage';
import { WordFilter } from 'src/service/filter';
import { mockConfig } from './mockConfig';
import { FilteredRepository } from 'src/repository/filtered';

describe('Word Filter', () => {
  const repository = sinon.createStubInstance(FilteredRepository);
  const filter = new WordFilter(mockConfig, repository);

  it('Should return false when message was not filtered', async () => {
    const message = { ...baseMessage, ...{ body: 'This should not be filtered' } };
    const result = await filter.filter(message);
    expect(result).to.be.false;
  });

  it('Should return true when message was filtered and persist to database', async () => {
    const message = { ...baseMessage, ...{ body: 'This has bad word in it' } };
    const result = await filter.filter(message);
    expect(result).to.be.true;
    expect(repository.insert.calledOnce).to.be.true;
  });
});
