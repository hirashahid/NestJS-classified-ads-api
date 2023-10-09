import { api_keys } from './seed-data/api_key';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// execute this file bu running command: pnpm run seed
async function main() {
  for (let api_key of api_keys) {
    await prisma.api_Key.create({
      data: api_key
    })
  }
}

main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect();
})
