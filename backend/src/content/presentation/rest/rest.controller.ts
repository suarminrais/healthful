import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetAllContentsQuery,
  GetContentByIdQuery,
} from '../../application/content.query';
import {
  CurrentUser,
  type JwtUser,
  OptionalJwtAuthGuard,
} from 'src/shared/jwt';

@Controller('contents')
export class ContentController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllContentsQuery());
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user?: JwtUser) {
    return this.queryBus.execute(new GetContentByIdQuery(id, user));
  }
}
