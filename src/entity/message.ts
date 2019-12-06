import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DomainEntity } from './domainEntity';

export type MessageDTO = DomainEntity<MessageEntity>;

/**
 * Class representing a discord message entity in the database.
 */
@Entity({ name: 'Message' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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
}
