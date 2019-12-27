import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { FilteredRepository } from 'src/repository/filtered';
import { FilteredEntity } from 'src/entity';
import { FilterReason } from 'src/service/filter';
import { DatabaseError } from 'src/error';
import { mockMessageEntity } from 'tests/repository/mockMessageEntity';

describe('Filtered Repository', () => {
  const sandbox = sinon.createSandbox();

  let filteredRepository: FilteredRepository;
  let typeOrmRepository: sinon.SinonStubbedInstance<any>;
  let findMock: sinon.SinonStub;

  describe('Success', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<FilteredEntity>], Promise<Array<FilteredEntity>>>();

      findMock = typeOrmRepository.find.withArgs({ where: { reason: FilterReason.Unknown } })
        .resolves([
          { id: '1', reason: FilterReason.Unknown, message: mockMessageEntity },
          { id: '2', reason: FilterReason.Unknown, message: mockMessageEntity },
        ]);

      filteredRepository = new FilteredRepository(typeOrmRepository as any as typeorm.Repository<FilteredEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByReason() should return all filtered with a given reason', async () => {
      const result = await filteredRepository.getAllByReason(FilterReason.Unknown);
      expect(findMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', reason: FilterReason.Unknown, message: mockMessageEntity });
      expect(result[1]).to.deep.equal({ id: '2', reason: FilterReason.Unknown, message: mockMessageEntity });
    });
  });

  describe('Failure', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<FilteredEntity>], Promise<Array<FilteredEntity>>>();

      findMock = typeOrmRepository.find.rejects();
      filteredRepository = new FilteredRepository(typeOrmRepository as any as typeorm.Repository<FilteredEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByReason() should throw a database error', async () => {
      try {
        await filteredRepository.getAllByReason(FilterReason.Unknown);
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });
  });
});
