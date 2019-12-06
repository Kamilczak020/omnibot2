import { IEntityDataMapper } from './base/dataMapper';
import { MessageEntity, MessageDTO } from 'src/entity';

/**
 * A MessageEntity data mapper, mapping between Message Entity and its' DTO
 */
export class MessageDataMapper implements IEntityDataMapper<MessageDTO, MessageEntity> {

  /**
   * Returns a message DTO given a message Entity
   * @param entity Message entity
   */
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

  /**
   * Returns a message Entity given a message DTO
   * @param domain Message DTO
   */
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
