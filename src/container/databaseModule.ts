import { SERVICE_IDENTIFIER, REPOSITORY_IDENTIFIER } from 'src/constants';
import { IConnectionProvider, ConnectionProvider } from 'src/database';
import { AsyncContainerModule, interfaces } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';
import { IMessageRepository, MessageRepository } from 'src/repository/message';
import { MessageEntity, FilteredEntity, MatchedEntity, ParsedEntity } from 'src/entity';
import { loadConfig } from 'src/config';
import { IConnectionProviderConfig, TConnectionProviderConfig } from 'src/config/database';
import { IFilteredRepository, FilteredRepository } from 'src/repository/filtered';
import { IMatchedRepository, MatchedRepository } from 'src/repository/matched';
import { IParsedRepository, ParsedRepository } from 'src/repository/parsed';

export const databaseModule = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    const providerConfig = loadConfig<IConnectionProviderConfig>(TConnectionProviderConfig, './config/connectionProviderConfig.yml');
    const connectionProvider = new ConnectionProvider(providerConfig);
    const connection = await connectionProvider.getConnection();

    bind<IConnectionProvider>(SERVICE_IDENTIFIER.IConnectionProvider)
      .toConstantValue(connectionProvider);

    bind<TypeOrmRepository<MessageEntity>>(REPOSITORY_IDENTIFIER.TypeOrmMessageRepository)
      .toConstantValue(connection.getRepository(MessageEntity));

    bind<TypeOrmRepository<FilteredEntity>>(REPOSITORY_IDENTIFIER.TypeOrmFilteredRepository)
      .toConstantValue(connection.getRepository(FilteredEntity));

    bind<TypeOrmRepository<MatchedEntity>>(REPOSITORY_IDENTIFIER.TypeOrmMatchedRepository)
      .toConstantValue(connection.getRepository(MatchedEntity));

    bind<TypeOrmRepository<ParsedEntity>>(REPOSITORY_IDENTIFIER.TypeOrmParsedRepository)
    .toConstantValue(connection.getRepository(ParsedEntity));

    bind<IMessageRepository>(REPOSITORY_IDENTIFIER.IMessageRepository)
      .to(MessageRepository)
      .inRequestScope();

    bind<IFilteredRepository>(REPOSITORY_IDENTIFIER.IFilteredRepository)
      .to(FilteredRepository)
      .inRequestScope();

    bind<IMatchedRepository>(REPOSITORY_IDENTIFIER.IMatchedRepository)
    .to(MatchedRepository)
    .inRequestScope();

    bind<IParsedRepository>(REPOSITORY_IDENTIFIER.IParsedRepository)
    .to(ParsedRepository)
    .inRequestScope();
  },
);
