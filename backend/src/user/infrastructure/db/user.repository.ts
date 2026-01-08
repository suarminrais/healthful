import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionType } from 'src/shared/schema/enums';
import { UserSchema } from 'src/shared/schema/user.schema';
import { User } from 'src/user/domain/user.entity';
import { UserRepository } from 'src/user/domain/user.repository';
import { Repository } from 'typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repo: Repository<UserSchema>,
  ) {}

  public async subscribe(id: string, subscribe_id: string): Promise<boolean> {
    const data = await this.repo.findOneBy({ id });

    if (!data) throw new NotFoundException(`user ${id} not found`);

    const newData = this.repo.create({
      ...data,
      subscriptionId: subscribe_id,
    });
    const user = await this.repo.save(newData);

    return user.subscriptionId != null;
  }

  public async register(user: User, password: string): Promise<User> {
    const data = await this.repo.findOneBy({ email: user.email });
    if (data) throw new BadRequestException('Opps.. something went wrong!');
    const newData = this.repo.create({
      id: user.id,
      email: user.email,
      password: password,
    });
    await this.repo.save(newData);

    return user;
  }

  public async signIn(email: string, password: string): Promise<User> {
    const data = await this.repo.findOne({
      where: { email },
      relations: ['subscription'],
    });
    if (!data) throw new BadRequestException('Opps.. something went wrong!');
    const user = new User(
      data.id,
      data.email,
      data.subscription?.type == SubscriptionType.PREMIUM,
    );

    user.validatePassword(password);
    const isMatch = await user.comparePassword(password, data.password);
    if (!isMatch) throw new BadRequestException('Opps.. something went wrong!');

    return user;
  }
}
