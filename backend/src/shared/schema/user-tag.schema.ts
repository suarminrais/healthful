import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserSchema } from './user.schema';
import { TagSchema } from './tag.schema';

@Entity('user_tags')
export class UserTagSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserSchema, (user) => user.userTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserSchema;

  @ManyToOne(() => TagSchema, (tag) => tag.userTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag: TagSchema;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
