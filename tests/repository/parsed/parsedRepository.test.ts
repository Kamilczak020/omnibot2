import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { ParsedRepository } from 'src/repository/parsed';
import { ParsedEntity } from 'src/entity';
import { DatabaseError } from 'src/error';
import { mockMessageEntity } from 'tests/repository/mockMessageEntity';

describe('Parsed Repository', () => {
  const sandbox = sinon.createSandbox();

  let parsedRepository: ParsedRepository;
  let typeOrmRepository: sinon.SinonStubbedInstance<any>;
  let findByHandlerMock: sinon.SinonStub;

  describe('Success', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<ParsedEntity>], Promise<Array<ParsedEntity>>>();

      findByHandlerMock = typeOrmRepository.find
      .withArgs({ where: { handler: 'MockHandler' } }).resolves([
        { id: '1', handler: 'MockHandler', parsedMessage: ['test'], message: mockMessageEntity },
        { id: '2', handler: 'MockHandler', parsedMessage: ['test'], message: mockMessageEntity },
      ]);

      parsedRepository = new ParsedRepository(typeOrmRepository as any as typeorm.Repository<ParsedEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByHandler() should return all matched with a given handler', async () => {
      const result = await parsedRepository.getAllByHandler('MockHandler');
      expect(findByHandlerMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', handler: 'MockHandler', parsedMessage: ['test'], message: mockMessageEntity });
      expect(result[1]).to.deep.equal({ id: '2', handler: 'MockHandler', parsedMessage: ['test'], message: mockMessageEntity });
    });
  });

  describe('Failure', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<ParsedEntity>], Promise<Array<ParsedEntity>>>();

      findByHandlerMock = typeOrmRepository.find.rejects();
      parsedRepository = new ParsedRepository(typeOrmRepository as any as typeorm.Repository<ParsedEntity>);
    });

    after(() => {
      sandbox.restore();
    });

    it('getAllByHandler() should throw a database error', async () => {
      try {
        await parsedRepository.getAllByHandler('MockHandler');
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });
  });
});
