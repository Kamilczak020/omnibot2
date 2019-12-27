import { IEntityDataMapper } from 'src/repository/base';
import { ParsedEntity, ParsedDTO } from 'src/entity';

/**
 * A ParsedEntity data mapper, mapping between Parsed Entity and its' DTO
 */
export class ParsedDataMapper implements IEntityDataMapper<ParsedDTO, ParsedEntity> {

  /**
   * Returns a parsed DTO given a parsed Entity
   * @param entity Parsed entity
   */
  public toDomain(entity: ParsedEntity): ParsedDTO {
    return {
      id: entity.id,
      handler: entity.handler,
      parsedMessage: entity.parsedMessage,
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
   * Returns a parsed Entity given a parsed DTO
   * @param domain Parsed DTO
   */
  public toEntity(domain: ParsedDTO): ParsedEntity {
    return new ParsedEntity(domain);
  }
}
