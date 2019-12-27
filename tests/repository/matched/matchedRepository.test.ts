import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { MatchedRepository } from 'src/repository/matched';
import { MatchedEntity } from 'src/entity';
import { DatabaseError } from 'src/error';
import { mockMessageEntity } from 'tests/repository/mockMessageEntity';

describe('Matched Repository', () => {
  const sandbox = sinon.createSandbox();

  let matchedRepository: MatchedRepository;
  let typeOrmRepository: sinon.SinonStubbedInstance<any>;
  let findByParserMock: sinon.SinonStub;
  let findByHandlerMock: sinon.SinonStub;

  describe('Success', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<MatchedEntity>], Promise<Array<MatchedEntity>>>();

      findByParserMock = typeOrmRepository.find
        .withArgs({ where: { parser: 'MockParser' } }).resolves([
          { id: '1', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity },
          { id: '2', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity },
        ]);

      findByHandlerMock = typeOrmRepository.find
      .withArgs({ where: { handler: 'MockHandler' } }).resolves([
        { id: '1', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity },
        { id: '2', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity },
      ]);

      matchedRepository = new MatchedRepository(typeOrmRepository as any as typeorm.Repository<MatchedEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByParser() should return all matched with a given parser', async () => {
      const result = await matchedRepository.getAllByParser('MockParser');
      expect(findByParserMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity });
      expect(result[1]).to.deep.equal({ id: '2', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity });
    });

    it('getAllByHandler() should return all matched with a given handler', async () => {
      const result = await matchedRepository.getAllByHandler('MockHandler');
      expect(findByHandlerMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity });
      expect(result[1]).to.deep.equal({ id: '2', parser: 'MockParser', handler: 'MockHandler', message: mockMessageEntity });
    });
  });

  describe('Failure', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<MatchedEntity>], Promise<Array<MatchedEntity>>>();

      findByParserMock = typeOrmRepository.find.rejects();
      findByHandlerMock = typeOrmRepository.find.rejects();
      matchedRepository = new MatchedRepository(typeOrmRepository as any as typeorm.Repository<MatchedEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByParser() should throw a database error', async () => {
      try {
        await matchedRepository.getAllByParser('MockParser');
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });

    it('getAllByHandler() should throw a database error', async () => {
      try {
        await matchedRepository.getAllByHandler('MockHandler');
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });
  });
});
