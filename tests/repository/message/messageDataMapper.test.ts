import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MessageDataMapper } from 'src/repository/message';
import { MessageEntity } from 'src/entity';

describe('Message Data Mapper', () => {
  const dataMapper = new MessageDataMapper();

  describe('toDomain() method', () => {
    const messageEntity = new MessageEntity({
      id: 'id',
      messageId: 'mId',
      body: 'body',
      channel: 'channel',
      guild: 'guild',
      author: 'author',
      timestamp: new Date(),
    });
    const messageDTO = dataMapper.toDomain(messageEntity);
    it('Should return a message DTO with keys matching entity properties', () => {
      expect(messageDTO).to.be.an('object').that.has.all.keys(Object.keys(messageEntity));
    });

    it('Should have matching values with the DTO', () => {
      Object.keys(messageDTO).forEach((key) => {
        expect(messageDTO[key]).to.be.equal(messageEntity[key]);
      });
    });
  });

  describe('toEntity() method', () => {
    const messageDTO = {
      id: 'id',
      messageId: 'mId',
      body: 'body',
      channel: 'channel',
      guild: 'guild',
      author: 'author',
      timestamp: new Date(),
    };
    const messageEntity = dataMapper.toEntity(messageDTO);
    it('Should return a messageEntity with values from the DTO', () => {
      Object.keys(messageEntity).forEach((key) => {
        expect(messageEntity[key]).to.be.equal(messageDTO[key]);
      });
    });
  });
});
