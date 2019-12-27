import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { ParsedDataMapper } from 'src/repository/parsed';
import { mockParsedEntity } from './mockParsedEntity';

describe('Parsed Data Mapper', () => {
  const dataMapper = new ParsedDataMapper();

  describe('toDomain() method', () => {
    const parsedDTO = dataMapper.toDomain(mockParsedEntity);
    it('Should return a matched DTO with keys matching entity properties', () => {
      expect(parsedDTO).to.be.an('object');
      expect(parsedDTO).to.have.keys(['id', 'handler', 'parsedMessage', 'message']);
      expect(parsedDTO.message).to.be.an('object').that.has.all.keys(Object.keys(mockParsedEntity.message));
    });

    it('Should have matching values with the DTO', () => {
      Object.keys(parsedDTO).forEach((key) => {
        expect(parsedDTO[key]).to.deep.equal(mockParsedEntity[key]);
      });
    });
  });

  describe('toEntity() method', () => {
    const parsedDTO = {
      id: 'id',
      handler: 'MockHandler',
      parsedMessage: ['test'],
      message: {
        id: 'id',
        messageId: 'mId',
        body: 'body',
        channel: 'channel',
        guild: 'guild',
        author: 'author',
        timestamp: new Date(),
      },
    };
    const parsedEntity = dataMapper.toEntity(parsedDTO);
    it('Should return a matchedEntity with values from the DTO', () => {
      expect(parsedEntity.id).to.be.equal(parsedDTO.id);
      expect(parsedEntity.handler).to.be.equal(parsedDTO.handler);
      expect(parsedEntity.parsedMessage).to.be.equal(parsedDTO.parsedMessage);
      Object.keys(parsedEntity.message).forEach((key) => {
        expect(parsedEntity.message[key]).to.be.equal(parsedDTO.message[key]);
      });
    });
  });
});
