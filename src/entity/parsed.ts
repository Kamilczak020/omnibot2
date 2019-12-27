import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { MessageEntity, MessageDTO } from './message';

export interface ParsedDTO {
  id: string;
  handler: string;
  parsedMessage: Array<string>;
  message: MessageDTO;
}

@Entity({ name: 'Parsed' })
export class ParsedEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public handler: string;

  @Column()
  public parsedMessage: Array<string>;

  @OneToOne(() => MessageEntity)
  @JoinColumn()
  public message: MessageEntity;

  public constructor(properties?: ParsedDTO) {
    this.id = properties?.id;
    this.handler = properties?.handler;
    this.parsedMessage = properties?.parsedMessage;
    this.message = new MessageEntity(properties.message);
  }
}
