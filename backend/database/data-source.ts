import 'dotenv/config';
import { ContentTagSchema } from '../src/shared/schema/content-tag.schema';
import { ContentSchema } from '../src/shared/schema/content.schema';
import { SubscriptionSchema } from '../src/shared/schema/subscription.schema';
import { TagSchema } from '../src/shared/schema/tag.schema';
import { UserTagSchema } from '../src/shared/schema/user-tag.schema';
import { UserSchema } from '../src/shared/schema/user.schema';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    UserSchema,
    SubscriptionSchema,
    ContentSchema,
    TagSchema,
    UserTagSchema,
    ContentTagSchema,
  ],
  migrations: ['./database/migrations/**/*.ts'],
  synchronize: false,
});
