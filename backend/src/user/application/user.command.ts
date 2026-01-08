import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../domain/user.entity';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository';

export interface AccessToken {
  access_token: string;
}

export class UserSignInCommand extends Command<AccessToken> {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}

@CommandHandler(UserSignInCommand)
export class UserSignInCommandHandler implements ICommandHandler<UserSignInCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: UserSignInCommand) {
    const user = await this.repository.signIn(command.email, command.password);
    const payload = {
      sub: user.id,
      username: user.email,
      subscription_id: user.hasSubscription,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

export class UserRegisterCommand extends Command<AccessToken> {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterCommandHandler implements ICommandHandler<UserRegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: UserRegisterCommand) {
    const user = new User(randomUUID(), command.email, false);
    const hash = await user.setPassword(command.password);
    const data = await this.repository.register(user, hash);
    const payload = {
      sub: data.id,
      username: data.email,
      subscription_id: data.hasSubscription,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
