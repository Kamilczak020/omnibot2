import { IEntityDataMapper } from './dataMapper';
import { injectable, unmanaged } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { DatabaseError } from 'src/error';

export interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  getOneById(id: string): Promise<T>;
  remove(entities: Array<T>): Promise<void>;
  insert(entities: Array<T>): Promise<void>;
}

@injectable()
export class GenericRepository<TDomainEntity, TDalEntity> implements IRepository<TDomainEntity> {
  protected readonly _repository: TypeOrmRepository<TDalEntity>;
  protected readonly _dataMapper: IEntityDataMapper<TDomainEntity, TDalEntity>;

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
  public async getAll() {
    try {
      const entities = await this._repository.find();
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('Error while getting entities from the database.');
    }
  }

  /**
   * Gets one record of given entity from the database by id.
   * @param id id to query with
   * @returns A record from the database
   */
  public async getOneById(id: string) {
    try {
      const entity = await this._repository.findOne({ where: { id } });
      return this._dataMapper.toDomain(entity);
    } catch (error) {
      throw new DatabaseError('Error while getting entities from the database.');
    }
  }

  /**
   * Removes all records that match given entity instances.
   * @param entities entity instances to remove
   */
  public async remove(entities: Array<TDomainEntity>) {
    try {
      const dalEntities = entities.map((e) => this._dataMapper.toEntity(e));
      await this._repository.remove(dalEntities);
    } catch (error) {
      throw new DatabaseError('Error while getting entities from the database.');
    }
  }

  /**
   * Inserts new records that represent given entity instances.
   * @param entities entity instances to insert
   */
  public async insert(entities: Array<TDomainEntity>) {
    try {
      const dalEntities = entities.map((e) => this._dataMapper.toEntity(e));
      await this._repository.insert(dalEntities);
    } catch (error) {
      throw new DatabaseError('Error while getting entities from the database.');
    }
  }
}
