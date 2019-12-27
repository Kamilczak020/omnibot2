import { GenericRepository, IRepository } from 'src/repository/base';
import { ParsedDTO, ParsedEntity } from 'src/entity';
import { injectable, inject } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { REPOSITORY_IDENTIFIER } from 'src/constants/repositoryIdentifier';
import { ParsedDataMapper } from './parsedDataMapper';
import { DatabaseError } from 'src/error';

export interface IParsedRepository extends IRepository<ParsedDTO> {
  getAllByHandler(handlerName: string): Promise<Array<ParsedDTO>>;
}

@injectable()
export class ParsedRepository
  extends GenericRepository<ParsedDTO, ParsedDTO>
  implements IParsedRepository {

  public constructor(
    @inject(REPOSITORY_IDENTIFIER.TypeOrmParsedRepository) repository: TypeOrmRepository<ParsedEntity>,
  ) {
    super(repository, new ParsedDataMapper());
  }

  public async getAllByHandler(handlerName: string) {
    try {
      const entities = await this._repository.find({ where: { handler: handlerName } });
      return entities.map((e) => this._dataMapper.toDomain(e));
    } catch (error) {
      throw new DatabaseError('[ParsedRepository] Error while getting entities from the database.');
    }
  }
}
