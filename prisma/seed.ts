import { API_KEYS } from './seed-data/api_key';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// execute this file bu running command: pnpm run seed
async function main() {
  for (const apiKey of API_KEYS) {
    await prisma.api_Key.create({
      data: apiKey,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
