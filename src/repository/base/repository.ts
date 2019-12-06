import { IEntityDataMapper } from './dataMapper';
import { injectable, unmanaged } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { DomainEntity } from 'src/entity';

export interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  getOneById(id: string): Promise<T>;
  remove(entities: Array<DomainEntity<T>>): Promise<void>;
  insert(entities: Array<DomainEntity<T>>): Promise<void>;
}

@injectable()
export class GenericRepository<TDomainEntity extends DomainEntity<TDalEntity>, TDalEntity> implements IRepository<TDomainEntity> {
  private readonly _repository: TypeOrmRepository<TDalEntity>;
  private readonly _dataMapper: IEntityDataMapper<TDomainEntity, TDalEntity>;

  public constructor(
    @unmanaged() repository: TypeOrmRepository<TDalEntity>,
    @unmanaged() dataMapper: IEntityDataMapper<TDomainEntity, TDalEntity>,
  ) {
    this._repository = repository;
    this._dataMapper = dataMapper;
  }

  /**
   * Gets all records from the database of given entity.
   * @returns An array of database records
   */
  public async getAll(): Promise<Array<TDomainEntity>> {
    const entities = await this._repository.find();
    return entities.map((e) => this._dataMapper.toDomain(e));
  }

  /**
   * Gets one record of given entity from the database by id.
   * @param id id to query with
   * @returns A record from the database
   */
  public async getOneById(id: string): Promise<TDomainEntity> {
    const entity = await this._repository.findOne({ where: { id } });
    return this._dataMapper.toDomain(entity);
  }

  /**
   * Removes all records that match given entity instances.
   * @param entities entity instances to remove
   */
  public async remove(entities: Array<TDomainEntity>): Promise<void> {
    const dalEntities = entities.map((e) => this._dataMapper.toEntity(e));
    await this._repository.remove(dalEntities);
  }

  /**
   * Inserts new records that represent given entity instances.
   * @param entities entity instances to insert
   */
  public async insert(entities: Array<TDomainEntity>): Promise<void> {
    const dalEntities = entities.map((e) => this._dataMapper.toEntity(e));
    await this._repository.insert(dalEntities);
  }
}
