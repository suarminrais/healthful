import { BadRequestException } from '@nestjs/common';
import { SubscriptionType } from 'src/shared/schema/enums';

export class Subscription {
  constructor(
    public readonly id: string,
    public name: string,
    public type: SubscriptionType,
    public price: number,
  ) {
    if (!id) throw new BadRequestException('subscription_id is required');
  }
}
