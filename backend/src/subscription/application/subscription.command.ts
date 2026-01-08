import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Subscription } from '../domain/subscription.entity';
import { JwtUser } from 'src/shared/jwt';
import { Inject } from '@nestjs/common';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from '../domain/subscription.repository';

export class EndrollSubscriptionCommand extends Command<Subscription> {
  constructor(
    public readonly user: JwtUser,
    public readonly id: string,
  ) {
    super();
  }
}

@CommandHandler(EndrollSubscriptionCommand)
export class EndrollSubscriptionCommandHandler implements ICommandHandler<EndrollSubscriptionCommand> {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly repository: SubscriptionRepository,
  ) {}

  execute(command: EndrollSubscriptionCommand): Promise<Subscription> {
    return this.repository.endrollSubscription(command.user.userId, command.id);
  }
}
