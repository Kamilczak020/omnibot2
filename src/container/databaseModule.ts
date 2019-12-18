import { SERVICE_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { IConnectionProvider, ConnectionProvider } from 'src/database';
import { AsyncContainerModule, interfaces } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { IMessageRepository, MessageRepository } from 'src/repository/message';
import { MessageEntity } from 'src/entity';
import { loadConfig } from 'src/config';
import { IConnectionProviderConfig, TConnectionProviderConfig } from 'src/config/database';

export const databaseModule = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    const providerConfig = loadConfig<IConnectionProviderConfig>(TConnectionProviderConfig, './config/connectionProviderConfig.yml');
    const connectionProvider = new ConnectionProvider(providerConfig);
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
