import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';

chai.use(sinonChai);
const expect = chai.expect;

import { FilteredDataMapper } from 'src/repository/filtered';
import { mockFilteredEntity } from './mockFilteredEntity';
import { FilterReason } from 'src/service/filter';

describe('Filtered Data Mapper', () => {
  const dataMapper = new FilteredDataMapper();

  describe('toDomain() method', () => {
    const filteredDTO = dataMapper.toDomain(mockFilteredEntity);
    it('Should return a filtered DTO with keys matching entity properties', () => {
      expect(filteredDTO).to.be.an('object');
      expect(filteredDTO).to.have.keys(['id', 'reason', 'message']);
      expect(filteredDTO.message).to.be.an('object').that.has.all.keys(Object.keys(mockFilteredEntity.message));
    });

    it('Should have matching values with the DTO', () => {
      Object.keys(filteredDTO).forEach((key) => {
        expect(filteredDTO[key]).to.deep.equal(mockFilteredEntity[key]);
      });
    });
  });

  describe('toEntity() method', () => {
    const filteredDTO = {
      id: 'id',
      reason: FilterReason.Unknown,
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
    const filteredEntity = dataMapper.toEntity(filteredDTO);
    it('Should return a filteredEntity with values from the DTO', () => {
      expect(filteredEntity.id).to.be.equal(filteredDTO.id);
      expect(filteredEntity.reason).to.be.equal(filteredDTO.reason);
      Object.keys(filteredEntity.message).forEach((key) => {
        expect(filteredEntity.message[key]).to.be.equal(filteredDTO.message[key]);
      });
    });
  });
});
