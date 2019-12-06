import container from 'src/container/installer';
import { IBot } from 'src/core/bot';
import { SERVICE_IDENTIFIER } from './constants';

async function main() {
  const discordBot = container.get<IBot>(SERVICE_IDENTIFIER.IBot);
  try {
    discordBot.start();
  } catch (error) {
    console.log(error);
  }
}

main();
