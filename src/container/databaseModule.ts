import { SERVICE_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { IConnectionProvider, ConnectionProvider } from 'src/database';
import { AsyncContainerModule, interfaces } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { IMessageRepository, MessageRepository } from 'src/repository/message';
import { MessageEntity } from 'src/entity';

export const databaseModule = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    const connectionProvider = new ConnectionProvider();
    const connection = await connectionProvider.getConnection();

    bind<IConnectionProvider>(SERVICE_IDENTIFIER.IConnectionProvider)
      .toConstantValue(connectionProvider);

    bind<TypeOrmRepository<MessageEntity>>(REPOSITORY_IDENTIFIER.TypeOrmMessageRepository)
      .toConstantValue(connection.getRepository(MessageEntity));

    bind<IMessageRepository>(REPOSITORY_IDENTIFIER.IMessageRepository)
      .to(MessageRepository)
      .inRequestScope();
  },
);
