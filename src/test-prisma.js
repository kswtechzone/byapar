import prisma from './lib/prisma.js';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (e) {
    console.error('Prisma Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
