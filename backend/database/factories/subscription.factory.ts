import { faker } from '@faker-js/faker';
import { SubscriptionType } from 'src/shared/schema/enums';
import { SubscriptionSchema } from 'src/shared/schema/subscription.schema';

export const subscriptionFactory = (
  overrides?: Partial<SubscriptionSchema>,
): SubscriptionSchema => {
  const subscription = new SubscriptionSchema();

  subscription.type = faker.helpers.arrayElement([
    SubscriptionType.FREE,
    SubscriptionType.PREMIUM,
  ]);
  subscription.name = faker.lorem.word();
  subscription.price = Number(faker.finance.accountNumber(3));

  return Object.assign(subscription, overrides);
};
