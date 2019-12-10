import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { MockDTO, MockEntity } from './mockEntity';
import { MockDataMapper } from './mockDataMapper';
import { GenericRepository } from 'src/repository/base';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

describe('Generic Repository', () => {
  const dataMapper = new MockDataMapper();
  const sandbox = sinon.createSandbox();

  let genericRepository: GenericRepository<MockDTO, MockEntity>;
  let typeOrmRepository: sinon.SinonStubbedInstance<any>;
  let findMock: sinon.SinonStub;
  let findOneMock: sinon.SinonStub;
  let removeMock: sinon.SinonStub;
  let insertMock: sinon.SinonStub;

  before(() => {
    typeOrmRepository = sandbox.stub();
    typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<MockEntity>], Promise<Array<MockEntity>>>();
    typeOrmRepository.findOne = sandbox.stub<[typeorm.FindOneOptions<MockEntity>?], Promise<MockEntity>>();
    typeOrmRepository.remove = sandbox.stub<[Array<MockEntity>, typeorm.RemoveOptions?], Promise<MockEntity | Array<MockEntity>>>();
    typeOrmRepository.insert = sandbox.stub<[QueryDeepPartialEntity<MockEntity> | (QueryDeepPartialEntity<Array<MockEntity>>)], Promise<typeorm.InsertResult>>();

    findMock = typeOrmRepository.find.withArgs().resolves([{ id: '1', body: 'test1' }, { id: '2', body: 'test2' }]);
    findOneMock = typeOrmRepository.findOne.withArgs({ where: { id: '1' } }).resolves(new MockEntity({ id: '1', body: 'test1' }));
    removeMock = typeOrmRepository.remove;
    insertMock = typeOrmRepository.insert;

    genericRepository = new GenericRepository<MockDTO, MockEntity>(typeOrmRepository as any, dataMapper);
  });

  after(() => {
    sandbox.restore();
  });

  describe('getAll() method', () => {
    it('Should return all rows on an entity', async () => {
      const result = await genericRepository.getAll();
      expect(findMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', body: 'test1' });
      expect(result[1]).to.deep.equal({ id: '2', body: 'test2' });
    });
  });

  describe('getOne() method', () => {
    it('Should return a single result when provided a DTO matching a row in database', async () => {
      const result = await genericRepository.getOneById('1');
      expect(findOneMock.calledOnce).to.be.true;
      expect(result).to.deep.equal({ id: '1', body: 'test1' });
    });
  });

  describe('remove() method', () => {
    it('Should remove rows from database', async () => {
      await genericRepository.remove([{ id: '1', body: 'test1' }]);
      expect(removeMock.calledOnce).to.be.true;
    });
  });

  describe('insert() method', () => {
    it('Should insert rows to database', async () => {
      await genericRepository.insert([{ id: '1', body: 'test1' }]);
      expect(insertMock.calledOnce).to.be.true;
    });
  });
});
