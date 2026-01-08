import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDTO } from './user.dto';
import {
  UserRegisterCommand,
  UserSignInCommand,
} from '../application/user.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  register(@Body() dto: UserDTO) {
    return this.commandBus.execute(
      new UserRegisterCommand(dto.email, dto.password),
    );
  }

  @Post('login')
  login(@Body() dto: UserDTO) {
    return this.commandBus.execute(
      new UserSignInCommand(dto.email, dto.password),
    );
  }
}
