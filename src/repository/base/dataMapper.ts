import { DomainEntity } from 'src/entity';

export interface IEntityDataMapper<Domain extends DomainEntity<Entity>, Entity> {
  toDomain(entity: Entity): Domain;
  toEntity(domain: Domain): Entity;
}
