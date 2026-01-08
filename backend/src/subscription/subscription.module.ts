import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SubscriptionController } from './presentation/rest.controller';
import { USER_REPOSITORY } from 'src/user/domain/user.repository';
import { UserRepositoryImpl } from 'src/user/infrastructure/db/user.repository';
import { EndrollSubscriptionCommandHandler } from './application/subscription.command';
import { SUBSCRIPTION_REPOSITORY } from './domain/subscription.repository';
import { SubscriptionRepositoryImpl } from './infrastructure/db/subscription.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/shared/schema/user.schema';
import { SubscriptionSchema } from 'src/shared/schema/subscription.schema';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserSchema, SubscriptionSchema]),
  ],
  controllers: [SubscriptionController],
  providers: [
    EndrollSubscriptionCommandHandler,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: SubscriptionRepositoryImpl,
    },
  ],
})
export class SubscriptionModule {}
