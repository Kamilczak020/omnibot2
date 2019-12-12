import { inject, injectable } from 'inversify';
import { createConnection, Connection } from 'typeorm';
import { IConnectionProviderConfig } from 'src/config/database';
import { CONFIG_IDENTIFIER } from 'src/constants';
import { DatabaseError } from 'src/error';
import { MessageEntity } from 'src/entity';
import { isNil } from 'src/util';

export interface IConnectionProvider {
  getConnection(): Promise<Connection>;
}

@injectable()
export class ConnectionProvider implements IConnectionProvider {
  private connection: Connection;

  @inject(CONFIG_IDENTIFIER.IConnectionProviderConfig)
  private config: IConnectionProviderConfig;

  private async connect(): Promise<void> {
    this.connection = await createConnection({
      type: this.config.type,
      host: this.config.host,
      port: this.config.port,
      username: this.config.username,
      password: this.config.password,
      database: this.config.database,
      entities: [MessageEntity],
    });
  }

  public async getConnection(): Promise<Connection> {
    if (isNil(this.connection)) {
      try {
        await this.connect();
      } catch (error) {
        throw new DatabaseError('Cannot establish a connection to the database.');
      }
    }

    return this.connection;
  }
}
