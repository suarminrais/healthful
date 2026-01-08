import { DataSource } from 'typeorm';
import { userFactory } from '../factories/user.factory';
import { subscriptionFactory } from '../factories/subscription.factory';
import { contentFactory } from '../factories/content.factory';
import { UserSchema } from 'src/shared/schema/user.schema';
import { SubscriptionSchema } from 'src/shared/schema/subscription.schema';
import { ContentSchema } from 'src/shared/schema/content.schema';
import { SubscriptionType } from 'src/shared/schema/enums';

export async function initialSeed(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(UserSchema);
  const subscriptionRepo = dataSource.getRepository(SubscriptionSchema);
  const contentRepo = dataSource.getRepository(ContentSchema);

  // USERS
  const users = Array.from({ length: 2 }).map(() => userFactory());
  await userRepo.save(users);

  // SUBSCRIPTION FREE
  const subscriptions = [
    subscriptionFactory({ type: SubscriptionType.FREE }),
    subscriptionFactory({ type: SubscriptionType.PREMIUM }),
  ];
  await subscriptionRepo.save(subscriptions);

  // CONTENTS
  const contents = Array.from({ length: 10 }).map(() => contentFactory());
  await contentRepo.save(contents);

  console.log('✅ Initial seed completed');
}
