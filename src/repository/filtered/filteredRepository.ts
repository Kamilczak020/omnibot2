import { GenericRepository, IRepository } from 'src/repository/base';
import { FilteredDTO, FilteredEntity } from 'src/entity';
import { injectable, inject } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { REPOSITORY_IDENTIFIER } from 'src/constants/repositoryIdentifier';
import { FilteredDataMapper } from './filteredDataMapper';
import { DatabaseError } from 'src/error';
import { FilterReason } from 'src/service/filter';

export interface IFilteredRepository extends IRepository<FilteredDTO> {
  getAllByReason(reason: FilterReason): Promise<Array<FilteredDTO>>;
}

@injectable()
export class FilteredRepository
  extends GenericRepository<FilteredDTO, FilteredEntity>
  implements IFilteredRepository {

  public constructor(
    @inject(REPOSITORY_IDENTIFIER.TypeOrmFilteredRepository) repository: TypeOrmRepository<FilteredEntity>,
  ) {
    super(repository, new FilteredDataMapper());
  }

  public async getAllByReason(reason: FilterReason) {
    try {
      const entities = await this._repository.find({ where: { reason } });
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('[FilteredRepository] Error while getting entities from the database.');
    }
  }
}
