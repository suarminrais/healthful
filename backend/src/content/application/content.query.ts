import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  CONTENT_REPOSITORY,
  type ContentRepository,
} from '../domain/content.repository';
import { Content } from '../domain/content.entity';
import { JwtUser } from 'src/shared/jwt';

export class GetContentByIdQuery extends Query<Content> {
  constructor(
    public readonly id: string,
    public readonly user?: JwtUser,
  ) {
    super();
  }
}

export class GetAllContentsQuery extends Query<Content[]> {}

@QueryHandler(GetContentByIdQuery)
export class GetContentByIdHandler implements IQueryHandler<GetContentByIdQuery> {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly repository: ContentRepository,
  ) {}

  async execute(query: GetContentByIdQuery) {
    const content = await this.repository.findById(query.id);
    content.assertCanBeAccessedBy(query.user);
    return content;
  }
}

@QueryHandler(GetAllContentsQuery)
export class GetAllContentsHandler implements IQueryHandler<GetAllContentsQuery> {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly repository: ContentRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
