import { IEntityDataMapper } from 'src/repository/base';
import { MatchedEntity, MatchedDTO } from 'src/entity';

/**
 * A MatchedEntity data mapper, mapping between Matched Entity and its' DTO
 */
export class MatchedDataMapper implements IEntityDataMapper<MatchedDTO, MatchedEntity> {

  /**
   * Returns a matched DTO given a matched Entity
   * @param entity Matched entity
   */
  public toDomain(entity: MatchedEntity): MatchedDTO {
    return {
      id: entity.id,
      parser: entity.parser,
      handler: entity.handler,
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
   * Returns a matched Entity given a matched DTO
   * @param domain Matched DTO
   */
  public toEntity(domain: MatchedDTO): MatchedEntity {
    return new MatchedEntity(domain);
  }
}
