import { User } from './user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  register(user: User, password: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  subscribe(id: string, subscribe_id: string): Promise<boolean>;
}
