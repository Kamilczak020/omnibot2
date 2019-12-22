import { GenericRepository, IRepository } from 'src/repository/base';
import { FilteredMessageDTO, FilteredMessageEntity } from 'src/entity';
import { injectable, inject } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { REPOSITORY_IDENTIFIER } from 'src/constants/repositoryIdentifier';
import { FilteredMessageDataMapper } from './filteredMessageDataMapper';
import { DatabaseError } from 'src/error';
import { FilterReason } from 'src/service/filter';

export interface IFilteredMessageRepository extends IRepository<FilteredMessageDTO> {
  getAllByReason(reason: FilterReason): Promise<Array<FilteredMessageDTO>>;
}

@injectable()
export class FilteredMessageRepository
  extends GenericRepository<FilteredMessageDTO, FilteredMessageEntity>
  implements IFilteredMessageRepository {

  public constructor(
    @inject(REPOSITORY_IDENTIFIER.TypeOrmFilteredMessageRepository) repository: TypeOrmRepository<FilteredMessageEntity>,
  ) {
    super(repository, new FilteredMessageDataMapper());
  }

  public async getAllByReason(reason: FilterReason) {
    try {
      const entities = await this._repository.find({ where: { reason } });
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('[FilteredMessageRepository] Error while getting entities from the database.');
    }
  }
}
