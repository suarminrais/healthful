import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SubscriptionSchema } from './subscription.schema';
import { UserTagSchema } from './user-tag.schema';

@Entity('users')
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId: string | null;

  @ManyToOne(() => SubscriptionSchema, (subscription) => subscription.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionSchema;

  @OneToMany(() => UserTagSchema, (userTag) => userTag.user)
  userTags: UserTagSchema[];
}
