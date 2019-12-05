import { IEntityDataMapper } from './dataMapper';
import { injectable, unmanaged } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';

export interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  getOneById(id: string): Promise<T>;
}

@injectable()
export class GenericRepository<TDomainEntity, TDalEntity> implements IRepository<TDomainEntity> {
  private readonly _repository: TypeOrmRepository<TDalEntity>;
  private readonly _dataMapper: IEntityDataMapper<TDomainEntity, TDalEntity>;

  public constructor(
    @unmanaged() repository: TypeOrmRepository<TDalEntity>,
    @unmanaged() dataMapper: IEntityDataMapper<TDomainEntity, TDalEntity>,
  ) {
    this._repository = repository;
    this._dataMapper = dataMapper;
  }

  public async getAll(): Promise<Array<TDomainEntity>> {
    const entities = await this._repository.find();
    return entities.map((e) => this._dataMapper.toDomain(e));
  }

  public async getOneById(id: string): Promise<TDomainEntity> {
    const entity = await this._repository.findOne({ where: { id } });
    return this._dataMapper.toDomain(entity);
  }
}
