import { installContainer } from 'src/container/installer';
import { SERVICE_IDENTIFIER } from './constants';
import { IBot } from 'src/core';

async function main() {
  try {
    const container = await installContainer();
    const discordBot = container.get<IBot>(SERVICE_IDENTIFIER.IBot);
    discordBot.start();
  } catch (error) {
    console.log(error);
  }
}

main();
