import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtUser } from 'src/shared/jwt';
import { ContentType, SubscriptionType } from 'src/shared/schema/enums';

export class Content {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public publishedDate: Date,
    public type: ContentType,
    public subscriptionType: SubscriptionType,
  ) {}

  isFree(): boolean {
    return this.subscriptionType === SubscriptionType.FREE;
  }

  assertCanBeAccessedBy(user?: JwtUser): void {
    if (this.isFree()) return;

    if (!user || !user.isAuthenticated) {
      throw new UnauthorizedException('Login required');
    }

    if (!user.hasActiveSubscription) {
      throw new ForbiddenException('Subscription required');
    }
  }
}
