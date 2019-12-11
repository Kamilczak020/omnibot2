import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import * as typeorm from 'typeorm';
import { MessageRepository } from 'src/repository/message';
import { MessageEntity } from 'src/entity';
import { DatabaseError } from 'src/error';

describe('Message Repository', () => {
  const sandbox = sinon.createSandbox();
  const timestamp = new Date();

  let messageRepository: MessageRepository;
  let typeOrmRepository: sinon.SinonStubbedInstance<any>;
  let findMock: sinon.SinonStub;

  describe('Success', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<MessageEntity>], Promise<Array<MessageEntity>>>();

      findMock = typeOrmRepository.find.withArgs({ where: { author: 'john' } })
        .resolves([
          { id: '1', messageId: '1', body: 'test1', author: 'john', channel: 'test1', guild: 'test1', timestamp },
          { id: '2', messageId: '2', body: 'test2', author: 'john', channel: 'test2', guild: 'test2', timestamp },
        ]);

      messageRepository = new MessageRepository(typeOrmRepository as any);
    });

    after(() => {
      sandbox.restore();
    });

    it('GetAllByAuthor() method should return all messages by given author', async () => {
      const result = await messageRepository.getAllByAuthor('john');
      expect(findMock.calledOnce).to.be.true;
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
      expect(result[0]).to.deep.equal({ id: '1', messageId: '1', body: 'test1', author: 'john', channel: 'test1', guild: 'test1', timestamp });
      expect(result[1]).to.deep.equal({ id: '2', messageId: '2', body: 'test2', author: 'john', channel: 'test2', guild: 'test2', timestamp });
    });
  });

  describe('Failure', () => {
    before(() => {
      typeOrmRepository = sandbox.stub();
      typeOrmRepository.find = sandbox.stub<[typeorm.FindManyOptions<MessageEntity>], Promise<Array<MessageEntity>>>();

      findMock = typeOrmRepository.find.rejects();

      messageRepository = new MessageRepository(typeOrmRepository as any);
    });

    after(() => {
      sandbox.restore();
    });

    it('GetAllByAuthor() method should throw a database error', async () => {
      try {
        await messageRepository.getAllByAuthor('john');
      } catch (error) {
        expect(error).to.be.instanceOf(DatabaseError);
      }
    });
  });
});
