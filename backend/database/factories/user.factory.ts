import { faker } from '@faker-js/faker';
import { UserSchema } from 'src/shared/schema/user.schema';

export const userFactory = (overrides?: Partial<UserSchema>): UserSchema => {
  const user = new UserSchema();

  user.email = faker.internet.email().toLowerCase();
  user.password = faker.internet.password();

  return Object.assign(user, overrides);
};
