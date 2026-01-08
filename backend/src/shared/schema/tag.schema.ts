import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserTagSchema } from './user-tag.schema';
import { ContentTagSchema } from './content-tag.schema';

@Entity('tags')
export class TagSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserTagSchema, (userTag) => userTag.tag)
  userTags: UserTagSchema[];

  @OneToMany(() => ContentTagSchema, (contentTag) => contentTag.tag)
  contentTags: ContentTagSchema[];
}
