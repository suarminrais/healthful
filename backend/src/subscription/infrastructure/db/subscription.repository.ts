import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionSchema } from 'src/shared/schema/subscription.schema';
import { Subscription } from 'src/subscription/domain/subscription.entity';
import { SubscriptionRepository } from 'src/subscription/domain/subscription.repository';
import {
  USER_REPOSITORY,
  type UserRepository,
} from 'src/user/domain/user.repository';
import { Repository } from 'typeorm';

export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionSchema)
    private readonly repo: Repository<SubscriptionSchema>,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  public async endrollSubscription(
    user_id: string,
    id: string,
  ): Promise<Subscription> {
    if (!user_id) throw new BadRequestException('user_id is required');
    if (!id) throw new BadRequestException('subscription_id is required');

    const data = await this.repo.findOneBy({ id });
    if (!data) throw new NotFoundException(`${id} not found`);

    const isSubscribe = await this.userRepo.subscribe(user_id, id);

    if (!isSubscribe)
      throw new BadRequestException('Opps.. something went wrong!');

    return new Subscription(data.id, data.name, data.type, data.price);
  }
}
