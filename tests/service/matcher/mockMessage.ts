import { MessageDTO } from 'src/entity/message';

export const baseMessage: MessageDTO = {
  id: '1',
  messageId: '1',
  body: '',
  channel: 'test',
  guild: 'test',
  author: 'test',
  timestamp: new Date(),
};
