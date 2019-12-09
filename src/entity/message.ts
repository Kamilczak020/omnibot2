import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DomainEntity } from './domainEntity';
import { isNil } from 'src/util';

export type MessageDTO = DomainEntity<MessageEntity>;

/**
 * Class representing a discord message entity in the database.
 */
@Entity({ name: 'Message' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public messageId: string;

  @Column()
  public body: string;

  @Column()
  public author: string;

  @Column()
  public channel: string;

  @Column()
  public guild: string;

  @Column()
  public timestamp: Date;

  public constructor(properties?: MessageDTO) {
    this.id = properties?.id;
    this.messageId = properties?.messageId;
    this.body = properties?.body;
    this.author = properties?.author;
    this.channel = properties?.channel;
    this.guild = properties?.guild;
    this.timestamp = properties?.timestamp;
  }
}
