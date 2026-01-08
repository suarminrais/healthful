import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EndrollSubscriptionCommand } from '../application/subscription.command';
import { CurrentUser, JwtAuthGuard, type JwtUser } from 'src/shared/jwt';
import { SubscriptionDTO } from './subscription.dto';

@Controller('subscribes')
export class SubscriptionController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  register(@Body() dto: SubscriptionDTO, @CurrentUser() user?: JwtUser) {
    return this.commandBus.execute(
      new EndrollSubscriptionCommand(user!, dto.subscription_id),
    );
  }
}
