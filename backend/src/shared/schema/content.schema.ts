import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ContentType, SubscriptionType } from './enums';
import { ContentTagSchema } from './content-tag.schema';

@Entity('contents')
export class ContentSchema {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'date', nullable: true, name: 'published_date' })
  publishedDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ContentType,
  })
  type: ContentType;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.FREE,
    name: 'subscription_type',
  })
  subscriptionType: SubscriptionType;

  @OneToMany(() => ContentTagSchema, (contentTag) => contentTag.content)
  contentTags: ContentTagSchema[];
}
