import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'Admin',
    },
  });
  await prisma.channel.create({ data: { name: 'Général', userId: admin.id } });
  await prisma.channel.create({ data: { name: 'Projet', userId: admin.id } });
  await prisma.user.create({
    data: {
      email: 'john@john.com',
      name: 'John',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
