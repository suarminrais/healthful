import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSchema } from 'src/shared/schema/user.schema';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/db/user.repository';
import { UserController } from './presentation/rest.controller';
import {
  UserRegisterCommandHandler,
  UserSignInCommandHandler,
} from './application/user.command';
import { ContentTagSchema } from 'src/shared/schema/content-tag.schema';
import { TagSchema } from 'src/shared/schema/tag.schema';
import { UserTagSchema } from 'src/shared/schema/user-tag.schema';
import { SubscriptionSchema } from 'src/shared/schema/subscription.schema';

const CommandHandlers = [UserRegisterCommandHandler, UserSignInCommandHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserSchema,
      ContentTagSchema,
      TagSchema,
      UserTagSchema,
      SubscriptionSchema,
    ]),
  ],
  controllers: [UserController],
  providers: [
    ...CommandHandlers,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
