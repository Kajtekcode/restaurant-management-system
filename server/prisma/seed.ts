import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Delete existing user if any
  await prisma.user.deleteMany({
    where: { email: 'kajtek@example.com' },
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('test123', salt);

  const user = await prisma.user.create({
    data: {
      name: 'Kajetan',
      email: 'kajtek@example.com',
      password: hashedPassword,
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
