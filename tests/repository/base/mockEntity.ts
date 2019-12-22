export interface MockDTO {
  id: string;
  body: string;
}

export class MockEntity {
  public id: string;

  public body: string;

  public constructor(properties?: MockDTO) {
    this.id = properties?.id;
    this.body = properties?.body;
  }
}
