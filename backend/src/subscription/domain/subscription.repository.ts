import { Subscription } from './subscription.entity';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface SubscriptionRepository {
  endrollSubscription(user_id: string, id: string): Promise<Subscription>;
}
