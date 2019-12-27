import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { MessageEntity, MessageDTO } from './message';

export interface MatchedDTO {
  id: string;
  parser: string;
  handler: string;
  message: MessageDTO;
}

@Entity({ name: 'Matched' })
export class MatchedEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public parser: string;

  @Column()
  public handler: string;

  @OneToOne(() => MessageEntity)
  @JoinColumn()
  public message: MessageEntity;

  public constructor(properties?: MatchedDTO) {
    this.id = properties?.id;
    this.parser = properties?.parser;
    this.handler = properties?.handler;
    this.message = new MessageEntity(properties.message);
  }
}
