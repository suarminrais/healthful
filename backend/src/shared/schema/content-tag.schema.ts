import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ContentSchema } from './content.schema';
import { TagSchema } from './tag.schema';

@Entity('content_tags')
export class ContentTagSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ContentSchema, (content) => content.contentTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'content_id' })
  content: ContentSchema;

  @ManyToOne(() => TagSchema, (tag) => tag.contentTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag: TagSchema;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
