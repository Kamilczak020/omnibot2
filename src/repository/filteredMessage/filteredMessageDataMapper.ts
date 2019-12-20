import { IEntityDataMapper } from 'src/repository/base';
import { FilteredMessageEntity, FilteredMessageDTO } from 'src/entity';

/**
 * A MessageEntity data mapper, mapping between Message Entity and its' DTO
 */
export class FilteredMessageDataMapper implements IEntityDataMapper<FilteredMessageDTO, FilteredMessageEntity> {

  /**
   * Returns a message DTO given a message Entity
   * @param entity Message entity
   */
  public toDomain(entity: FilteredMessageEntity): FilteredMessageDTO {
    return {
      id: entity.id,
      reason: entity.reason,
      message: {
        id: entity.message.id,
        messageId: entity.message.messageId,
        body: entity.message.body,
        author: entity.message.author,
        channel: entity.message.channel,
        guild: entity.message.guild,
        timestamp: entity.message.timestamp,
      },
    };
  }

  /**
   * Returns a message Entity given a message DTO
   * @param domain Message DTO
   */
  public toEntity(domain: FilteredMessageDTO): FilteredMessageEntity {
    return new FilteredMessageEntity(domain);
  }
}
