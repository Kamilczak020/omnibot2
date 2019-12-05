import { IEntityDataMapper } from './base/dataMapper';
import { MessageEntity, MessageDTO } from 'src/entity';

export class MessageDataMapper implements IEntityDataMapper<MessageDTO, MessageEntity> {
  public toDomain(entity: MessageEntity): MessageDTO {
    return {
      id: entity.id,
      body: entity.body,
      author: entity.author,
      channel: entity.channel,
      guild: entity.guild,
      timestamp: entity.timestamp,
    };
  }

  public toEntity(domain: MessageDTO): MessageEntity {
    const entity = new MessageEntity();
    entity.id = domain.id;
    entity.body = domain.body;
    entity.author = domain.author;
    entity.channel = domain.channel;
    entity.guild = domain.guild;
    entity.timestamp = domain.timestamp;

    return entity;
  }
}
