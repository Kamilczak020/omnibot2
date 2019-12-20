import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { FilterReason } from 'src/service/filter';
import { MessageEntity, MessageDTO } from './message';

export interface FilteredMessageDTO {
  id: string;
  reason: FilterReason;
  message: MessageDTO;
}

@Entity({ name: 'FilteredMessage' })
export class FilteredMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: FilterReason,
    default: FilterReason.Unknown,
  })
  public reason: FilterReason;

  @OneToOne(() => MessageEntity)
  @JoinColumn()
  public message: MessageEntity;

  public constructor(properties?: FilteredMessageDTO) {
    this.id = properties?.id;
    this.reason = properties?.reason;
    this.message = new MessageEntity(properties.message);
  }
}
