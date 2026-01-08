import 'dotenv/config';
import { AppDataSource } from '../data-source';
import { initialSeed } from './initial.seed';

async function runSeed() {
  await AppDataSource.initialize();
  console.log('📦 Database connected');

  await initialSeed(AppDataSource);

  await AppDataSource.destroy();
  console.log('🌱 Seeding finished');
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
