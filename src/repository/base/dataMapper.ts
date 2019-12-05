export interface IEntityDataMapper<Domain, Entity> {
  toDomain(entity: Entity): Domain;
  toEntity(domain: Domain): Entity;
}
