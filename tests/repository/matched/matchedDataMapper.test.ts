import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { MatchedDataMapper } from 'src/repository/matched';
import { mockMatchedEntity } from './mockMatchedEntity';

describe('Matched Data Mapper', () => {
  const dataMapper = new MatchedDataMapper();

  describe('toDomain() method', () => {
    const matchedDTO = dataMapper.toDomain(mockMatchedEntity);
    it('Should return a matched DTO with keys matching entity properties', () => {
      expect(matchedDTO).to.be.an('object');
      expect(matchedDTO).to.have.keys(['id', 'parser', 'handler', 'message']);
      expect(matchedDTO.message).to.be.an('object').that.has.all.keys(Object.keys(mockMatchedEntity.message));
    });

    it('Should have matching values with the DTO', () => {
      Object.keys(matchedDTO).forEach((key) => {
        expect(matchedDTO[key]).to.deep.equal(mockMatchedEntity[key]);
      });
    });
  });

  describe('toEntity() method', () => {
    const matchedDTO = {
      id: 'id',
      parser: 'MockParser',
      handler: 'MockHandler',
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
    const matchedEntity = dataMapper.toEntity(matchedDTO);
    it('Should return a matchedEntity with values from the DTO', () => {
      expect(matchedEntity.id).to.be.equal(matchedDTO.id);
      expect(matchedEntity.parser).to.be.equal(matchedDTO.parser);
      expect(matchedEntity.handler).to.be.equal(matchedDTO.handler);
      Object.keys(matchedEntity.message).forEach((key) => {
        expect(matchedEntity.message[key]).to.be.equal(matchedDTO.message[key]);
      });
    });
  });
});
