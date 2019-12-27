import { GenericRepository, IRepository } from 'src/repository/base';
import { MatchedDTO, MatchedEntity } from 'src/entity';
import { injectable, inject } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { REPOSITORY_IDENTIFIER } from 'src/constants/repositoryIdentifier';
import { MatchedDataMapper } from './matchedDataMapper';
import { DatabaseError } from 'src/error';

export interface IMatchedRepository extends IRepository<MatchedDTO> {
  getAllByParser(parserName: string): Promise<Array<MatchedDTO>>;
  getAllByHandler(handlerName: string): Promise<Array<MatchedDTO>>;
}

@injectable()
export class MatchedRepository
  extends GenericRepository<MatchedDTO, MatchedEntity>
  implements IMatchedRepository {

  public constructor(
    @inject(REPOSITORY_IDENTIFIER.TypeOrmMatchedRepository) repository: TypeOrmRepository<MatchedEntity>,
  ) {
    super(repository, new MatchedDataMapper());
  }

  public async getAllByParser(parserName: string) {
    try {
      const entities = await this._repository.find({ where: { parser: parserName } });
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('[MatchedRepository] Error while getting entities from the database.');
    }
  }

  public async getAllByHandler(handlerName: string) {
    try {
      const entities = await this._repository.find({ where: { handler: handlerName } });
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('[MatchedRepository] Error while getting entities from the database.');
    }
  }
}
