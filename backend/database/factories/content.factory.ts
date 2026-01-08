import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { ContentSchema } from 'src/shared/schema/content.schema';
import { ContentType, SubscriptionType } from 'src/shared/schema/enums';

export const contentFactory = (
  overrides?: Partial<ContentSchema>,
): ContentSchema => {
  const content = new ContentSchema();

  content.id = randomUUID();
  content.title = faker.lorem.sentence();
  content.description = faker.lorem.paragraphs(3);
  content.publishedDate = faker.date.recent();
  content.subscriptionType = faker.helpers.arrayElement([
    SubscriptionType.FREE,
    SubscriptionType.PREMIUM,
  ]);
  content.type = faker.helpers.arrayElement([
    ContentType.ARTICLE,
    ContentType.VIDEO,
  ]);

  return Object.assign(content, overrides);
};
