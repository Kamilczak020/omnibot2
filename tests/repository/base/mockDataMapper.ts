import { IEntityDataMapper } from 'src/repository/base';
import { MockDTO, MockEntity } from './mockEntity';

export class MockDataMapper implements IEntityDataMapper<MockDTO, MockEntity> {
  public toDomain(entity: MockEntity): MockDTO {
    return {
      id: entity.id,
      body: entity.body,
    };
  }

  public toEntity(domain: MockDTO): MockEntity {
    return new MockEntity(domain);
  }
}
