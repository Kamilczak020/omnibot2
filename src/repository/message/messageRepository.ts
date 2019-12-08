import { GenericRepository, IRepository } from 'src/repository/base';
import { MessageDTO, MessageEntity } from 'src/entity';
import { injectable, inject } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { REPOSITORY_IDENTIFIER } from 'src/constants/repositoryIdentifier';
import { MessageDataMapper } from './messageDataMapper';

export interface IMessageRepository extends IRepository<MessageDTO> {

}

@injectable()
export class MessageRepository
  extends GenericRepository<MessageDTO, MessageEntity>
  implements IMessageRepository {

  public constructor(
    @inject(REPOSITORY_IDENTIFIER.TypeOrmMessageRepository) repository: TypeOrmRepository<MessageEntity>,
  ) {
    super(repository, new MessageDataMapper());
  }
}
