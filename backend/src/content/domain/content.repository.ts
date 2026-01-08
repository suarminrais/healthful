import { Content } from './content.entity';

export const CONTENT_REPOSITORY = 'CONTENT_REPOSITORY';

export interface ContentRepository {
  findById(id: string): Promise<Content>;
  findAll(): Promise<Content[]>;
}
