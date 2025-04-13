import { PrismaClient } from '@prisma/client';
import { zh_CN, en, base, Faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const faker = new Faker({ locale: [zh_CN, en, base] });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = Array.from({ length: 10 }).map((_, i) => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));

  await prisma.user.createMany({ data: users });

  const userIds = (await prisma.user.findMany()).map((user) => user.id);

  const posts = Array.from({ length: 30 }).map((_, i) => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.url(),
    published: true,
    authorId: faker.helpers.arrayElement(userIds),
  }));

  await Promise.all(
    posts.map((post) =>
      prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map((_, i) => ({
                content: faker.lorem.sentence(),
                authorId: faker.helpers.arrayElement(userIds),
              })),
            },
          },
        },
      }),
    ),
  );

  console.log('Seeding completed successfully.');
}
main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
