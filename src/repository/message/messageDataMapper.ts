import { IEntityDataMapper } from 'src/repository/base';
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
      messageId: entity.messageId,
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
    return new MessageEntity(domain);
  }
}
