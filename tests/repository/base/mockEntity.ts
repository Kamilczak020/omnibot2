import { DomainEntity } from 'src/entity/domainEntity';

export type MockDTO = DomainEntity<MockEntity>;

export class MockEntity {
  public id: string;

  public body: string;

  public constructor(properties?: MockDTO) {
    this.id = properties?.id;
    this.body = properties?.body;
  }
}
