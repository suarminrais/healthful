import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../domain/content.entity';
import { ContentRepository } from '../../domain/content.repository';
import { ContentSchema } from '../../../shared/schema/content.schema';
import { NotFoundException } from '@nestjs/common';
import { SubscriptionType } from 'src/shared/schema/enums';

export class ContentRepositoryImpl implements ContentRepository {
  constructor(
    @InjectRepository(ContentSchema)
    private readonly repo: Repository<ContentSchema>,
  ) {}

  async findById(id: string): Promise<Content> {
    const data = await this.repo.findOneBy({ id });
    if (!data) throw new NotFoundException();

    return new Content(
      data.id,
      data.title,
      data.description,
      data.publishedDate,
      data.type,
      data.subscriptionType,
    );
  }

  async findAll(): Promise<Content[]> {
    const rows = await this.repo.find({
      where: {
        subscriptionType: SubscriptionType.FREE,
      },
    });
    return rows.map(
      (r) =>
        new Content(
          r.id,
          r.title,
          r.description,
          r.publishedDate,
          r.type,
          r.subscriptionType,
        ),
    );
  }
}
