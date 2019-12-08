import 'reflect-metadata';
import { Container } from 'inversify';
import { configModule } from './configModule';
import { serviceModule } from './serviceModule';
import { databaseModule } from './databaseModule';

export async function installContainer(): Promise<Container> {
  const container = new Container();
  container.load(configModule);
  container.load(serviceModule);
  await container.loadAsync(databaseModule);

  return container;
}
