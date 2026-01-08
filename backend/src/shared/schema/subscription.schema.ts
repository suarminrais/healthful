import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserSchema } from './user.schema';
import { SubscriptionType } from './enums';

@Entity('subscriptions')
export class SubscriptionSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: SubscriptionType })
  type: SubscriptionType;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => UserSchema, (user) => user.subscription)
  users: UserSchema[];
}
