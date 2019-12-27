import { MessageEntity } from 'src/entity';

export const mockMessageEntity = new MessageEntity({
  id: 'id',
  messageId: 'mId',
  body: 'body',
  channel: 'channel',
  guild: 'guild',
  author: 'author',
  timestamp: new Date(),
});
