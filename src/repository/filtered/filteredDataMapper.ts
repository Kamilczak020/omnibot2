import { IEntityDataMapper } from 'src/repository/base';
import { FilteredEntity, FilteredDTO } from 'src/entity';

/**
 * A FilteredEntity data mapper, mapping between Filtered Entity and its' DTO
 */
export class FilteredDataMapper implements IEntityDataMapper<FilteredDTO, FilteredEntity> {

  /**
   * Returns a filtered DTO given a filtered Entity
   * @param entity Filtered entity
   */
  public toDomain(entity: FilteredEntity): FilteredDTO {
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
   * Returns a filtered Entity given a filtered DTO
   * @param domain Filtered DTO
   */
  public toEntity(domain: FilteredDTO): FilteredEntity {
    return new FilteredEntity(domain);
  }
}
