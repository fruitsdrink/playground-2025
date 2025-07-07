import { hash } from "@node-rs/argon2";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    email: "hello@road-to-next.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the content of ticket 1.",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 100,
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the content of ticket 2.",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 50,
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the content of ticket 3.",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 50,
    status: "OPEN" as const,
  },
  {
    title: "Ticket 4",
    content: "This is the content of ticket 4.",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 100,
    status: "IN_PROGRESS" as const,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log("Seeding database...");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash("123456");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`Database seeded in ${(t1 - t0).toFixed(2)}ms`);
  await prisma.$disconnect();
  console.log("Disconnected from database.");
  console.log("Seeding complete.");
}

seed();
