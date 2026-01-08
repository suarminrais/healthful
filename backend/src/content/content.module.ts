import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentSchema } from '../shared/schema/content.schema';
import { ContentRepositoryImpl } from './infrastructure/db/content.repository';
import { CONTENT_REPOSITORY } from './domain/content.repository';
import { ContentController } from './presentation/rest/rest.controller';

import {
  GetAllContentsHandler,
  GetContentByIdHandler,
} from './application/content.query';

const QueryHandlers = [GetAllContentsHandler, GetContentByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ContentSchema])],
  controllers: [ContentController],
  providers: [
    ...QueryHandlers,
    {
      provide: CONTENT_REPOSITORY,
      useClass: ContentRepositoryImpl,
    },
  ],
})
export class ContentModule {}
